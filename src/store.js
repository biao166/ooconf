import path from 'path'
import os from 'os'
import fs from 'graceful-fs'
import mkdirp from 'mkdirp'
import xdgBasedir from 'xdg-basedir'
import writeFileAtomic from 'write-file-atomic'
import dotProp from 'dot-prop'
import uniqueString from 'unique-string'

import formats from './formats'
import pkg from '../package.json'
const debug = require('debug')(`${pkg.name}:store`)

const configDir = xdgBasedir.config || path.join(os.tmpdir(), uniqueString())
const permissionError = 'You don\'t have access to this file.'
const defaultPathMode = 0o0700
const writeFileOptions = {
  mode: 0o0600
}

const getByWeight = (conf) => {
  if (!Array.isArray(conf)) {
    return conf
  }

  if (conf.length === 1) {
    return conf[0]
  }

  let weight = 0

  conf.forEach((item) => {
    item.weight = item.weight || 1
    weight += item.weight
  })

  const random = Math.floor(Math.random() * weight) + 1
  weight = 0

  return _.find(conf, (item) => {
    weight += item.weight

    if (random <= weight) {
      delete item.weight
      return item
    }
  })
}

class Store {
  constructor(id, defaults, opts) {
    opts = opts || {}

    const pathPrefix = opts.globalConfigPath ?
      path.join(id, 'config.json') :
      path.join(pkg.name, `${id}.json`)

    this.path = path.join(configDir, pathPrefix)
    this.all = Object.assign({}, defaults, this.all)
  }

  get all() {
    try {
      return formats.parse(fs.readFileSync(this.path, 'utf8'))
    } catch (err) {
      if (err.code === 'ENOENT') {
        mkdirp.sync(path.dirname(this.path), defaultPathMode)
        return {}
      }

      if (err.code === 'EACCES') {
        err.message = `${err.message}\n${permissionError}\n`
      }

      if (err.name === 'SyntaxError') {
        writeFileAtomic.sync(this.path, '', writeFileOptions)
        return {}
      }

      throw err
    }
  }

  set all(val) {
    try {
      mkdirp.sync(path.dirname(this.path), defaultPathMode)

      writeFileAtomic.sync(this.path, formats.stringify(val), writeFileOptions)
    } catch (err) {
      if (err.code === 'EACCES') {
        err.message = `${err.message}\n${permissionError}\n`
      }

      throw err
    }
  }

  get size() {
    return Object.keys(this.all || {}).length
  }

  get(key) {
    const data = dotProp.get(this.all, key)
    return getByWeight(data)
  }

  set(key, val) {
    debug('set', key, val)

    const config = this.all

    if (arguments.length === 1) {
      for (const k of Object.keys(key)) {
        dotProp.set(config, k, key[k])
      }
    } else {
      dotProp.set(config, key, val)
    }

    this.all = config
  }

  has(key) {
    return dotProp.has(this.all, key)
  }

  delete(key) {
    debug('del', key)
    const config = this.all
    dotProp.delete(config, key)
    this.all = config
  }

  clear() {
    this.all = {}
  }
}

export default Store

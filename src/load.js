import path from 'path'

import pkg from '../package.json'
import fs from './fs'

const debug = require('debug')(`${pkg.name}:local`)

class Load {
  constructor(store, opts) {
    this.env = opts.env
    this.dir = opts.dir
    this.store = store
  }

  async load() {
    debug(this)
    let results = {}

    try {
      let files = await fs.readdirAsync(this.dir)
      files = files.filter(this.filter)

      for (let file of files) {
        let conf = await this.loadFile(file)
        debug(file, conf)
        results[conf.name] = this.parse(conf.data)
      }
    } catch (err) {
      console.error(pkg.name, err)
    }

    this.store.set(results)
  }

  filter(file) {
    const fileTypeRegex = new RegExp('.(' + (['json', 'js'].join('|')) + ')$', 'i')
    return fileTypeRegex.test(file)
  }

  async loadFile(file) {
    const ref = path.parse(file)

    // TODO 配置文件全部json化
    const data = require(path.join(this.dir, file))

    return {
      name: ref.name.toLowerCase().replace(/\./g, '_'),
      extension: ref.ext.toLowerCase(),
      data: data
    }
  }

  parse(conf) {
    const envDefault = conf['default']
    const envConf = conf[this.env]

    if (!envDefault && !envConf) {
      return conf
    }
    return Object.assign({}, envDefault || {}, envConf || {})
  }
}

export default Load

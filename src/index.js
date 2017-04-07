import Promise from 'bluebird'

import pkg from '../package.json'
import Fetch from './fetch'
import Store from './store'
import Load from './load'
const debug = require('debug')(`${pkg.name}`)

const noop = function (data) {
  return data
}

export default (id, defaults, opts) => {
  debug(id, defaults, opts)

  const store = new Store(id, defaults, opts)
  store.set(defaults)

  let load
  if (opts.dir && opts.env) {
    load = new Load(store, {
      dir: opts.dir,
      env: opts.env
    })
  }

  let fetch
  if (opts.remote) {
    fetch = new Fetch(store, {
      cronTime: opts.cronTime,
      parse: opts.parse || noop,
      ...opts.remote
    })
  }

  store.start = async function () {
    if (load) {
      await load.load()
    }

    if (fetch) {
      await fetch.fetch()
      fetch.job && fetch.job.start()
    }
  }

  return store
}

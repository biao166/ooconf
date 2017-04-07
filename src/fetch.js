import path from 'path'
import url from 'url'
import cron from 'cron'
import request from 'request'
import Promise from 'bluebird'

import pkg from '../package.json'
import formats from './formats'

const debug = require('debug')(`${pkg.name}:fetch`)

class Fetch {
  constructor(store, opts) {
    if (typeof opts === 'string') {
      this.url = opts
    } else {
      this.url = url.format({
        hostname: opts.host || opts.hostname,
        port: opts.port || 80,
        pathname: opts.pathname || opts.path,
        protocol: opts.protocol || 'http'
      })
    }

    this.parse = opts.parse

    if (opts.cronTime) {
      this.job = new cron.CronJob({
        cronTime: opts.cronTime,
        onTick: () => {
          this.fetch()
          console.log(`${pkg.name} fetch job ticked at ${new Date()}`);
        },
        start: false
      })
    }

    this.store = store
  }

  async fetch() {
    debug('fetch')
    let conf = {}

    try {
      conf = await this.fetchConf(this.url)
        .then(formats.parse)
        .then(this.validate)
        .then(this.parse)
    } catch (err) {
      // TODO handle error
      console.error(pkg.name, err)
    }

    this.store.set(conf)
  }

  async fetchConf(url) {
    const options = {
      url: url,
      timeout: 5000,
      headers: {
        'Connection': 'close',
        'Cache-control': 'max-age=0'
      }
    }

    return new Promise((resolve, reject) => {
      request(options, (err, response, body) => {
        if (!err && response.statusCode == 200) {
          resolve(body)
        } else if (!err && response.statusCode == 404) {
          reject(new Error('404 NOT FOUND'))
        } else {
          reject(err)
        }
      })
    })
  }

  validate(conf) {
    // TODO validate remote
    return conf
  }
}

export default Fetch

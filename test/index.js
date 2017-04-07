const urlFn = require('url')
const path = require('path')
const ooconf = require('../lib').default

const pkg = require('../package.json')

const env = process.env.NODE_ENV || 'development'

const centerConfigs = {
  development: {
    host: 'i.dev.browserproxy.wanyol.com',
    path: 'status/config'
  },
  testdev: {
    host: 'i.dev.browserproxy.wanyol.com',
    path: 'status/config'
  },
  test: {
    host: 'i.dev.browserproxy.wanyol.com',
    path: 'status/config'
  },
  prepub: {
    host: 'i.dev.browserproxy.wanyol.com',
    path: 'status/config'
  },
  production: {
    host: 'i.dev.browserproxy.wanyol.com',
    path: 'status/config'
  }
}

const confCenter = centerConfigs[env]

if (!confCenter) {
  throw new Error('There is no corresponding configuration for NODE_ENV')
  process.exit(1)
}

const conf = ooconf(pkg.name, {}, {
  env: env,
  dir: path.resolve(__dirname, './config'),
  remote: {
    host: confCenter.host,
    path: confCenter.path,
    port: confCenter.port
  },
  cronTime: '0-59 * * * *'
})


var asyncFun = async function () {
  const store = await conf

  console.log(store.get('core.appRoot'))
}

asyncFun().catch((err) => {
  console.error(err)
})

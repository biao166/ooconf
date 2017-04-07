// 配置中心地址

var defaultConfig = {
  host: '127.0.0.1',
  port: 19527
};

var developmentConfig = {
  host: 'conf.dev.browserproxy.wanyol.com',
  port: 80
};

var testdevConfig = {
  host: '172.16.1.19'
};

var testConfig = {
  host: '172.16.1.5'
};

var prepubConfig = {
  host: '172.16.1.16'
};

var productionConfig = {
  host: '10.10.0.30'
};

module.exports = {
  "default": defaultConfig,
  "development": developmentConfig,
  "testdev": testdevConfig,
  "test": testConfig,
  "prepub": prepubConfig,
  "production": productionConfig
};

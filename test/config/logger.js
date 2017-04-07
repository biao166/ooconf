// 日志输出级别

var defaultConfig = {
  level: 'debug'
};

var developmentConfig = {
  level: 'log'
};

var prepubConfig = {
  level: 'info'
};

var productionConfig = {
  level: 'info'
};

module.exports = {
  "default": defaultConfig,
  "development": developmentConfig,
  "prepub": prepubConfig,
  "production": productionConfig
};

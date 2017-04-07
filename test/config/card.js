/**
 * 备注：
 * slug 对应配置中心名称
 */

module.exports = {
  1001: {
    slug: 'hotsites',
    name: '热门网站',
    tpl: 'card/hotsite',
    method: 'getSiteList'
  },
  1002: {
    slug: 'site_navi',
    name: '网址导航',
    tpl: 'card/navigation',
    method: 'getData'
  },
  1004: {
    slug: 'video',
    name: '热门视频',
    tpl: 'card/video'
  },
  1005: {
    slug: 'life',
    name: '生活助手',
    tpl: 'card/life'
  },
  1007: {
    slug: 'game',
    name: '热门游戏',
    tpl: 'card/game'
  },
  1008: {
    slug: 'news',
    name: '新闻资讯',
    tpl: 'card/news'
  },
  1009: {
    slug: 'novel',
    name: '小说书架',
    tpl: 'card/novel'
  },
  1010: {
    slug: 'hotword',
    name: '实时热点',
    tpl: 'card/top'
  },
  1011: {
    slug: 'astrology',
    name: '星座运势',
    tpl: 'card/sign',
    method: 'getAllData'
  },
  1012: {
    slug: 'joke',
    name: '趣闻',
    tpl: 'card/fun'
  },
  1013: {
    slug: 'grab',
    name: '欧洲杯',
    tpl: 'card/euroCup',
    method: 'UEFAEuro2016'
  },
  1014: {
    slug: 'software',
    name: '软件应用',
    tpl: 'card/soft'
  },
  1016: {
    slug: 'opponews',
    name: 'OPPO资讯',
    tpl: 'card/oppo'
  },
  1017: {
    name: '新春',
    tpl: 'card/spring'
  },
  1018: {
    name: '招聘',
    tpl: 'card/joinUs'
  },
  1019: {
    slug: 'tuniu',
    name: '途牛暑假出行季',
    tpl: 'card/tuniu'
  },
  3001: {
    slug: 'topic',
    name: '热点话题',
    tpl: 'card/topic'
  }
};

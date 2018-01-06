var {FB, FacebookApiException} = require('fb');

const facebookConfig = require('../config/facebook')

FB.options({
  version: 'v2.4',
  appId: facebookConfig.appId, 
  appSecret: facebookConfig.appSecret, 
});
// FB.setAccessToken(facebookConfig.accessToken);

module.exports = FB;
var {FB, FacebookApiException} = require('fb');

const facebookConfig = require('../../../config/facebook')

console.log(facebookConfig);

FB.options({
  version: 'v2.4',
  appId: facebookConfig.appId, 
  appSecret: facebookConfig.appSecret, 
});
FB.setAccessToken(facebookConfig.accessToken);

const posts = [];

const getPostsPaginated = async (after_cursor) => {
	let endpoint = 'unheardvoices.intalert/feed';

	if(after_cursor) {
		endpoint += '?after=' + after_cursor;
	}
	
	return new Promise((resolve, reject) => {
		FB.api(endpoint, (res) => {
			if(!res || res.error) {
				reject(res.error)
			}
			resolve(res);
		});
	})
}

const getPosts = async() => {
	let after_cursor;
	let posts = [];
	do {
		let results = await getPostsPaginated(after_cursor);
		posts = posts.concat(results.data);
		after_cursor = results.paging ? results.paging.cursors.after : false;
	} while (after_cursor)

	return posts;
}

module.exports = getPosts;
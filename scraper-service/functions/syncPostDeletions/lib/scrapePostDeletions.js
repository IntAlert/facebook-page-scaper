const FBClient = require('../../../lib/FBClient')

const scrapePost = async (post) => {
	let endpoint = `${post.fb_id}`;

	return new Promise((resolve, reject) => {
		FBClient.setAccessToken(post.Page.access_token);
		FBClient.api(endpoint, (res) => {
			if(!res || res.error) {
				reject(res.error)
			}
			resolve(res);
		});
	})
}

const scrapePostExistance = async (post) => {
	try {
		await scrapePost(post);
		return true; // got this far, must have been OK
	} catch (error) {
		console.error(error);
		return false;
	}
}

// const checkPageAccessTokenPermissions = async (post) => {
// 	let endpoint = `${post.Page.fb_id}/feed`;
// 	return new Promise((resolve, reject) => {
// 		FBClient.setAccessToken(post.Page.access_token);
// 		FBClient.api(endpoint, (res) => {
// 			if(!res || res.error) {
// 				reject(res.error)
// 			}
// 			resolve(res);
// 		});
// 	})
// }

const scrapePostDeletions = async(posts) => {
	let deleted_post_ids = [];

	for(let post of posts) {
		// let accessTokenOK = await checkPageAccessTokenPermissions(post);
		// console.log(accessTokenOK);
		let exists = await scrapePostExistance(post);
		if (!exists) {
			deleted_post_ids.push(post.id);
		}
	}

	return deleted_post_ids;
}

module.exports = scrapePostDeletions;

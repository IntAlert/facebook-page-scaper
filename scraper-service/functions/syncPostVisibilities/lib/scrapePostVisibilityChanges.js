const FBClient = require('../../../lib/FBClient')

const scrapePost = async (post) => {
	let endpoint = `${post.fb_id}?fields=is_hidden`;

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

const scrapePostVisibilityChange = async (post) => {

	let visibilityDelta = {}
	try {
		let record = await scrapePost(post);
		// got this far: not deleted

		// has is_hidden changed from what we already know
		if (post.is_hidden != record.is_hidden) {
			visibilityDelta.is_hidden = record.is_hidden;
		}

	} catch (error) {

		if (error.code == 32) {
			// this is a rate limit error code,
			// so just say that the post is not changed for now
			// TODO: report somehow, slow things down?
		
			// no change to visibilityDelta
		} else {
			visibilityDelta.deleted = true;
		}
	}

	return visibilityDelta;
}


const scrapePostVisibilityChanges = async(posts) => {
	let deltas = {
		deleted_post_ids: [],
		is_hidden_post_ids: [],
		is_unhidden_post_ids: []
	}

	for(let post of posts) {
		let delta = await scrapePostVisibilityChange(post);
		if (delta.deleted) {
			deltas.deleted_post_ids.push(post.id);
		}
		if (delta.is_hidden) {
			deltas.is_hidden_post_ids.push(post.id);
		}

		if ( delta.is_hidden === false ) {
			deltas.is_unhidden_post_ids.push(post.id);
		}
	}

	return deltas;
}

module.exports = scrapePostVisibilityChanges;

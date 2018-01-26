const FBClient = require('../../../lib/FBClient')

const scrapeComment = async (comment) => {
	let endpoint = `${comment.fb_id}?fields=is_hidden`;

	console.log(endpoint);
	return new Promise((resolve, reject) => {
		FBClient.setAccessToken(comment.Page.access_token);
		FBClient.api(endpoint, (res) => {
			console.log(res);
			
			if(!res || res.error) {
				reject(res.error)
			}
			
			resolve(res);
		});
	})
}

const scrapeCommentVisibilityChange = async (comment) => {

	let visibilityDelta = {}
	try {
		let record = await scrapeComment(comment);
		// got this far: not deleted

		console.log(record)

		// has is_hidden changed from what we already know
		if (comment.is_hidden != record.is_hidden) {
			visibilityDelta.is_hidden = record.is_hidden;
		}

	} catch (error) {

		if (error.code == 32) {
			// this is a rate limit error code,
			// so just say that the comment is not changed for now
			// TODO: report somehow, slow things down?
		
			// no change to visibilityDelta
		} else {
			visibilityDelta.deleted = true;
		}
	}

	return visibilityDelta;
}


const scrapeCommentVisibilityChanges = async(comments) => {
	let deltas = {
		deleted_comment_ids: [],
		is_hidden_comment_ids: [],
		is_unhidden_comment_ids: []
	}

	for(let comment of comments) {
		let delta = await scrapeCommentVisibilityChange(comment);
		if (delta.deleted) {
			deltas.deleted_comment_ids.push(comment.id);
		}
		if (delta.is_hidden) {
			deltas.is_hidden_comment_ids.push(comment.id);
		}

		if ( delta.is_hidden === false ) {
			deltas.is_unhidden_comment_ids.push(comment.id);
		}
	}

	return deltas;
}

module.exports = scrapeCommentVisibilityChanges;

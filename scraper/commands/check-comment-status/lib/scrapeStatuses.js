const FBClient = require('../../../shared/FBClient')

const comments = [];


const getCommentsPaginated = async (post_id, after_cursor) => {
	let endpoint = `${post_id}/comments`;

	if(after_cursor) {
		endpoint += '?after=' + after_cursor;
	}
	
	return new Promise((resolve, reject) => {
		FBClient.api(endpoint, (res) => {
			if(!res || res.error) {
				reject(res.error)
			}
			resolve(res);
		});
	})
}

const scrapeCommentsByPostId = async(parent_post_fb_id) => {
	let after_cursor;
	let comments = [];
	do {
		let results = await getCommentsPaginated(parent_post_fb_id, after_cursor);
		comments = comments.concat(results.data);
		after_cursor = results.paging ? results.paging.cursors.after : false;
	} while (after_cursor)

	// add parent_comment_fb_id to each comment
	return comments.map(c => {
		c.parent_post_fb_id = parent_post_fb_id
		return c
	})

	return comments;
}

const scrapeComments = async(posts) => {
	let after_cursor;
	let comments = [];

	for(let post of posts) {
		let post_comments = await scrapeCommentsByPostId(post.fb_id);
		comments = comments.concat(post_comments);
	}

	return comments;
}

module.exports = scrapeComments;

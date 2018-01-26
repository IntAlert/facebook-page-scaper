const FBClient = require('../../../lib/FBClient')

const comments = [];


const getCommentsPaginated = async (parent_post, after_cursor) => {
	let endpoint = `${parent_post.fb_id}/comments?fields=is_hidden,created_time,from,message`;
	// let endpoint = `${parent_post.fb_id}/comments`;

	if(after_cursor) {
		endpoint += '&after=' + after_cursor;
	}
	
	return new Promise((resolve, reject) => {
		FBClient.setAccessToken(parent_post.Page.access_token);
		FBClient.api(endpoint, (res) => {
			if(!res || res.error) {
				reject(res.error)
			}
			resolve(res);
		});
	})
}

const scrapeCommentsByPost = async(parent_post) => {
	let after_cursor;
	let comments = [];
	do {
		let results = await getCommentsPaginated(parent_post, after_cursor);
		comments = comments.concat(results.data);
		after_cursor = results.paging ? results.paging.cursors.after : false;
	} while (after_cursor)

	// add parent_post_fb_id to each comment
	// add parent_post_id to each comment
	return comments.map(c => {
		c.parent_post_id = parent_post.id
		c.parent_post_fb_id = parent_post.fb_id,
		c.parent_page_id = parent_post.parent_page_id
		return c
	})

	return comments;
}

const scrapeComments = async(posts) => {
	let after_cursor;
	let comments = [];

	for(let post of posts) {
		try {
			let post_comments = await scrapeCommentsByPost(post);
			comments = comments.concat(post_comments);
		} catch (error) {
			// if see an error here, we just ignore it
			// the comment has probably been deleted
			console.log("Probable Deleted Post Detected: " + post.id);
		}
	}

	return comments;
}

module.exports = scrapeComments;

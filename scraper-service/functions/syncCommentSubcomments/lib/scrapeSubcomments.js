const FBClient = require('../../../lib/FBClient')

const comments = [];


const getCommentsPaginated = async (parent_comment, after_cursor) => {
	let endpoint = `${parent_comment.fb_id}/comments`;

	if(after_cursor) {
		endpoint += '?after=' + after_cursor;
	}

	return new Promise((resolve, reject) => {
		FBClient.setAccessToken(parent_comment.Page.access_token);
		FBClient.api(endpoint, (res) => {
			if(!res || res.error) {
				reject(res.error)
			}
			resolve(res);
		});
	})
}

const scrapeSubcommentsByComment = async(parent_comment) => {
	let after_cursor;
	let comments = [];
	do {
		let results = await getCommentsPaginated(parent_comment, after_cursor);
		comments = comments.concat(results.data);
		after_cursor = results.paging ? results.paging.cursors.after : false;
	} while (after_cursor)

	// add parent_comment_fb_id to each comment
	// add parent_comment_id to each comment
	// add parent_page_id to each comment
	return comments.map(c => {
		c.parent_comment_fb_id = parent_comment.fb_id,
		c.parent_comment_id = parent_comment.id
		c.parent_page_id = parent_comment.parent_page_id
		return c
	})
}

const scrapeSubcomments = async(comments) => {
	let after_cursor;
	let subcomments = [];

	for(let comment of comments) {
		let subcommentsPage = await scrapeSubcommentsByComment(comment);
		subcomments = subcomments.concat(subcommentsPage);
	}

	return subcomments;
}

module.exports = scrapeSubcomments;

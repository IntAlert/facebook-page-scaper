const FBClient = require('../../../shared/FBClient')

const comments = [];


const getCommentsPaginated = async (comment_id, after_cursor) => {
	let endpoint = `${comment_id}/comments`;

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

const scrapeSubcommentsByCommentId = async(comment_id) => {
	let after_cursor;
	let comments = [];
	do {
		let results = await getCommentsPaginated(comment_id, after_cursor);
		comments = comments.concat(results.data);
		after_cursor = results.paging ? results.paging.cursors.after : false;
	} while (after_cursor)

	return comments;
}

const scrapeSubcomments = async(comments) => {
	let after_cursor;
	let subcomments = [];

	for(let comment of comments) {
		let subcomments = await scrapeSubcommentsByCommentId(comment.fb_id);
		subcomments = subcomments.concat(subcomments);
	}

	return subcomments;
}

module.exports = scrapeSubcomments;

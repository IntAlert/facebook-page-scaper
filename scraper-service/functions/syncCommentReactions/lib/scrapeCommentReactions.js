const FBClient = require('../../../lib/FBClient')

const getCommentReactionsPaginated = async (comment, after_cursor) => {
	let endpoint = `${comment.fb_id}/reactions?summary=total_count,viewer_reaction`;

	if(after_cursor) {
		endpoint += '&after=' + after_cursor;
	}

	return new Promise((resolve, reject) => {
		FBClient.setAccessToken(comment.Page.access_token);
		FBClient.api(endpoint, (res) => {
			if(!res || res.error) {
				reject(res.error)
			}
			resolve(res);
		});
	})
}

const scrapeReactionsByComment = async(comment) => {
	let after_cursor;
	let reactions = [];
	let summary;
	do {
		let results = await getCommentReactionsPaginated(comment, after_cursor);
		reactions = reactions.concat(results.data);
		summary = results.summary; // gets overwritten many times with the same data
		after_cursor = results.paging ? results.paging.cursors.after : false;
	} while (after_cursor)

	// add comment_id to each status
	reactions = reactions.map(s => {
		s.comment_id = comment.id;
		return s
	})

	// build summary
	summary.comment_id = comment.id;

	return {
		summary, 
		all: reactions
	}
}

const scrapeCommentReactions = async(comments) => {
	let after_cursor;
	let all_reactions = [];
	let all_summaries = [];

	for(let comment of comments) {
		let reactions = await scrapeReactionsByComment(comment);
		all_reactions = all_reactions.concat(reactions.all);
		all_summaries.push(reactions.summary);
	}

	return {
		summaries: all_summaries, 
		all: all_reactions
	}
}


module.exports = scrapeCommentReactions;

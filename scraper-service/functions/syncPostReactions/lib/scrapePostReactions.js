const FBClient = require('../../../lib/FBClient')

const getPostReactionsPaginated = async (post, after_cursor) => {
	let endpoint = `${post.fb_id}/reactions?summary=total_count,viewer_reaction`;

	if(after_cursor) {
		endpoint += '&after=' + after_cursor;
	}

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

const scrapeReactionsByPost = async(post) => {
	let after_cursor;
	let reactions = [];
	let summary;
	do {
		let results = await getPostReactionsPaginated(post, after_cursor);
		reactions = reactions.concat(results.data);
		summary = results.summary; // gets overwritten many times with the same data
		after_cursor = results.paging ? results.paging.cursors.after : false;
	} while (after_cursor)

	// add post_id to each status
	reactions = reactions.map(s => {
		s.post_id = post.id;
		return s
	})

	// build summary
	summary.post_id = post.id;

	return {
		summary, 
		all: reactions
	}
}

const scrapePostReactions = async(posts) => {
	let after_cursor;
	let all_reactions = [];
	let all_summaries = [];

	for(let post of posts) {
		try {
			let reactions = await scrapeReactionsByPost(post);
			all_reactions = all_reactions.concat(reactions.all);
			all_summaries.push(reactions.summary);	
		} catch (error) {
			// if see an error here, we just ignore it
			// the comment has probably been deleted
			console.log("Probable Deleted Post Detected: " + post.id);
		}
		
	}

	return {
		summaries: all_summaries, 
		all: all_reactions
	}
}


module.exports = scrapePostReactions;

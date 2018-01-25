const models = require('alert-facebook-scraper-shared-models');


const updateCommentReactionSummaries = async (summaries) => {
	console.log(summaries)
	let records = [];
	for (let summary of summaries) {
		console.log(summary)
		let record = await models.Comment.update({
			fb_reactions_total_count: summary.total_count,
			fb_reactions_summary_type: summary.viewer_reaction,
		}, {
			where: {
				id: summary.comment_id
			},
		})

		records.push(record);
	}
	
	return records;

}


module.exports = updateCommentReactionSummaries;

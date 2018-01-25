const models = require('alert-facebook-scraper-shared-models');


const updatePostReactionSummaries = async (summaries) => {
	let records = [];
	for (let summary of summaries) {
		let record = await models.Post.update({
			fb_reactions_total_count: summary.total_count,
			fb_reactions_summary_type: summary.viewer_reaction,
		}, {
			where: {
				id: summary.post_id
			},
		})

		records.push(record);
	}
	
	return records;

}


module.exports = updatePostReactionSummaries;

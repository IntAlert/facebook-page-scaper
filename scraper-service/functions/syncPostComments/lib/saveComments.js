const models = require('alert-facebook-scraper-shared-models');
const saveComments = async (comments) => {

	const records = [];

	for(let comment of comments) {
		let record = await saveComment(comment);
		records.push(record);
	}

	return records;
}

const saveComment = (comment) => {
	
	return models.Comment.findOrCreate({
		where: {fb_id: comment.id}, 
		defaults: {
			fb_id: comment.id,
			fb_message: comment.message,
			fb_created_time: comment.created_time,
			fb_user_id: comment.from.id,
			fb_user_fullname: comment.from.name,
			parent_post_fb_id: comment.parent_post_fb_id,
			parent_post_id: comment.parent_post_id,
			parent_page_id: comment.parent_page_id
		}
	})
	.spread((record, created) => {
		if (!created) {
			// TODO: if it already existed, update the scrape time
			console.log('comment not new')
		}
		return record
	})
}


module.exports = saveComments;

var models  = require('../../../models');
const saveComments = (comments) => {

	const promises = [];

	comments.forEach(comment => {


		console.log('alan');
		console.log(comment);
		try {
			promises.push(saveComment(comment));
		} catch (error) {
			console.log("-- ERROR --")
			console.error(error)
			console.log(comment)
			console.log("-- ERROR --")
		}
	})

	return Promise.all(promises)
}

const saveComment = (comment) => {
	
	return models.Comment.findOrCreate({
		where: {fb_id: comment.id}, 
		defaults: {
			fb_id: comment.id,
			fb_message: comment.message,
			fb_created_time: comment.created_time,
			parent_comment_fb_id: comment.parent_comment_fb_id
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

var models  = require('../../../models');
const markCommentsAsScraped = async (comments) => {

	let comment_ids = comments.map(comment => comment.id);

	console.log("comments")
	console.log(comments)
	console.log("comment_ids")
	console.log(comment_ids)
	

	return models.Comment.update({
		comments_last_scraped: Date.now()
	}, {
		where: {
			'id': comment_ids
		}
	})
}

module.exports = markCommentsAsScraped;

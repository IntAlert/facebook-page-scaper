var models  = require('../../../models');
const markCommentsAsScraped = async (comments) => {

	let comment_ids = comments.map(comment => comment.id);


	return models.Comment.update({
		comments_last_scraped: Date.now()
	}, {
		where: {
			'id': post_ids
		}
	})
}

module.exports = markCommentsAsScraped;

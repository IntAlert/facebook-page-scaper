const models = require('alert-facebook-scraper-shared-models');
const markCommentsAsScraped = async (comments) => {

	let comment_ids = comments.map(comment => comment.id);

	return models.Comment.update({
		comments_last_scraped: Date.now()
	}, {
		where: {
			'id': comment_ids
		}
	})
}

module.exports = markCommentsAsScraped;

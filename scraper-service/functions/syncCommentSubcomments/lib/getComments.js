const models = require('alert-facebook-scraper-shared-models');
const getComments = async (limit = 10) => {

	let comments = await getCommentsNotScraped(limit);

	if (comments.length < limit) {
		let commentsLeastRecentlyScraped = await getCommentsLeastRecentlyScraped(limit-comments.length);
		comments = comments.concat(commentsLeastRecentlyScraped);
	}

	return comments;
}


const getCommentsNotScraped = async (limit) => {

	return models.Comment.findAll({
		where: {
			comments_last_scraped: null,
		},
		limit,
		include: [{
			model: models.Page,
		}]
	})

}

const getCommentsLeastRecentlyScraped = async (limit) => {
	
	return models.Comment.findAll({
		where: {
			comments_last_scraped: {$ne: null},
		},
		order: [['comments_last_scraped', 'ASC']],
		limit,
		include: [{
			model: models.Page,
		}]
	})

}

module.exports = getComments;

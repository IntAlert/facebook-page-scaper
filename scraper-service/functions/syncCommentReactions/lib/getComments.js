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
			reactions_last_scraped: null,
			deleted: false
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
			deleted: false,
			reactions_last_scraped: {$ne: null},
		},
		order: [['reactions_last_scraped', 'ASC']],
		limit,
		include: [{
			model: models.Page,
		}]
	})

}

module.exports = getComments;

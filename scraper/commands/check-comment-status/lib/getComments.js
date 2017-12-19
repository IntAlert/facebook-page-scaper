var models  = require('../../../models');
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
			status_last_scraped: null,
			deleted: false
		},
		limit,
	})

}

const getCommentsLeastRecentlyScraped = async (limit) => {
	
	return models.Comment.findAll({
		where: {
			deleted: false
		},
		order: [['status_last_scraped', 'ASC']],
		limit,
	})

}

module.exports = getComments;

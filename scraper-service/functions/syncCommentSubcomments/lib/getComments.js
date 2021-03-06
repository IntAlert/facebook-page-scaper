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
			parent_comment_id: null, // no such thing as subsubcomments
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
			parent_comment_id: null, // no such thing as subsubcomments
		},
		order: [['comments_last_scraped', 'ASC']],
		limit,
		include: [{
			model: models.Page,
		}]
	})

}

module.exports = getComments;

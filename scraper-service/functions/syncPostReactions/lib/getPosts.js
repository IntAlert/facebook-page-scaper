const models = require('alert-facebook-scraper-shared-models');
const getPosts = async (limit = 10) => {

	let posts = await getPostsNotScraped(limit);

	if (posts.length < limit) {
		let postsLeastRecentlyScraped = await getPostsLeastRecentlyScraped(limit-posts.length);
		posts = posts.concat(postsLeastRecentlyScraped);
	}

	return posts;
}


const getPostsNotScraped = async (limit) => {

	return models.Post.findAll({
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

const getPostsLeastRecentlyScraped = async (limit) => {
	
	return models.Post.findAll({
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

module.exports = getPosts;

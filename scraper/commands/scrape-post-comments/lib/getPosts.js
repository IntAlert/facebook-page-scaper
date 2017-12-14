var models  = require('../../../models');
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
			comments_last_scraped: null,
		},
		limit,
	})

}

const getPostsLeastRecentlyScraped = async (limit) => {
	
	return models.Post.findAll({
		order: [['comments_last_scraped', 'ASC']],
		limit,
	})

}

module.exports = getPosts;

const models = require('alert-facebook-scraper-shared-models');
const getPosts = async (limit = 10) => {

	let posts = await getPostsNotScraped(limit);

	// add most recently posted posts
	if (posts.length < limit) {
		let postsMostRecentlyPosted = await getPostsMostRecentlyPosted(2);
		posts = posts.concat(postsMostRecentlyPosted);
	}

	// add least recently scraped posts
	if (posts.length < limit) {
		let postsLeastRecentlyScraped = await getPostsLeastRecentlyScraped(limit-posts.length);
		posts = posts.concat(postsLeastRecentlyScraped);
	}

	// avoid returning same post twice
	let post_ids = []
	posts = posts.filter(post => {
		if (post_ids.indexOf(post.id) == -1) {
			post_ids.push(post.id);
			return post;
		}
	})

	return posts;
}


const getPostsNotScraped = async (limit) => {

	return models.Post.findAll({
		where: {
			comments_last_scraped: null,
			deleted: false,
		},
		limit,
		include: [{
			model: models.Page,
		}]
	})

}

const getPostsMostRecentlyPosted = async (limit) => {
	
	return models.Post.findAll({
		where: {
			comments_last_scraped: {$ne: null},
			deleted: false,
		},
		order: [['fb_created_time', 'DESC']],
		limit,
		include: [{
			model: models.Page,
		}]
	})

}


const getPostsLeastRecentlyScraped = async (limit) => {
	
	return models.Post.findAll({
		where: {
			comments_last_scraped: {$ne: null},
			deleted: false,
		},
		order: [['comments_last_scraped', 'ASC']],
		limit,
		include: [{
			model: models.Page,
		}]
	})

}

module.exports = getPosts;

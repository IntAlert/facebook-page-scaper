var models  = require('../../../models');
const markPostsAsScraped = async (posts) => {

	let post_ids = posts.map(post => post.id);


	return models.Post.update({
		comments_last_scraped: Date.now()
	}, {
		where: {
			'id': post_ids
		}
	})
}

module.exports = markPostsAsScraped;

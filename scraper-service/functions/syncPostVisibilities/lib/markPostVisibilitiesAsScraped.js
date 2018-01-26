const models = require('alert-facebook-scraper-shared-models');
const markPostReactionsAsScraped = async (posts) => {

	let post_ids = posts.map(post => post.id);
	
	return models.Post.update({
		visibility_last_scraped: Date.now()
	}, {
		where: {
			'id': post_ids
		}
	})
}

module.exports = markPostReactionsAsScraped;

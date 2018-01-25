const models = require('alert-facebook-scraper-shared-models');
const markPostReactionsAsScraped = async (posts) => {

	let post_ids = posts.map(post => post.id);
	console.log(post_ids)
	
	return models.Post.update({
		reactions_last_scraped: Date.now()
	}, {
		where: {
			'id': post_ids
		}
	})
}

module.exports = markPostReactionsAsScraped;

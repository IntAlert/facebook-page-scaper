const models = require('alert-facebook-scraper-shared-models');
const savePosts = (page, posts) => {

	const promises = [];

	posts.forEach(post => {
		try {
			promises.push(savePost(page, post));
		} catch (error) {
			console.log("-- ERROR --")
			console.error(error)
			console.log(post)
			console.log("-- ERROR --")
		}
	})

	return Promise.all(promises)
}

const savePost = (page, post) => {
	
	return models.Post.findOrCreate({
		where: {
			fb_id: post.id
		}, 
		defaults: {
			fb_id: post.id,
			fb_message: post.message,
			fb_story: post.story,
			fb_created_time: post.created_time,
			parent_page_id: page.id
		}
	})
	.spread((record, created) => {
		if (!created) {
			// TODO: if it already existed, update the scrape time
			console.log('not new')
		}
		return record
	})
}


module.exports = savePosts;

const models = require('alert-facebook-scraper-shared-models');
const savePosts = async (page, posts) => {

	const records = [];

	for(let post of posts) {
		let record = await savePost(page, post)
		records.push(record);
	}

	return records;
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
			fb_user_id: post.from.id,
			fb_user_fullname: post.from.name,
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

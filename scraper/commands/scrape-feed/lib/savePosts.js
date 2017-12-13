var models  = require('../../../models');
const savePosts = (posts) => {

	const promises = [];

	posts.forEach(post => {
		try {
			promises.push(savePost(post));
		} catch (error) {
			console.log("-- ERROR --")
			console.error(error)
			console.log(post)
			console.log("-- ERROR --")
		}
	})

	return Promise.all(promises).then(results => {

		// close the database connection
		models.sequelize.close();
		return results;
	});
}

const savePost = (post) => {
	
	return models.Post.findOrCreate({
		where: {fb_id: post.id}, 
		defaults: {
			fb_id: post.id,
			fb_message: post.message,
			fb_story: post.story,
			fb_created_time: post.created_time
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

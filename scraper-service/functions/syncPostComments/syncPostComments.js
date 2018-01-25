const models = require('alert-facebook-scraper-shared-models');
const getPosts  = require('./lib/getPosts');
const scrapeComments  = require('./lib/scrapeComments');
const saveComments  = require('./lib/saveComments');
const markPostsAsScraped = require('./lib/markPostsAsScraped');

module.exports.handler = async (event, context, callback) => {

	try {
		let posts = await getPosts(100);
		let comments = await scrapeComments(posts);
		let records = await saveComments(comments);
		console.log('Posts length: ' + posts.length);
		console.log('Comments length: ' + comments.length);
		
		await markPostsAsScraped(posts)

		// // close the database connection
		models.sequelize.close();
		callback(null, records);
		// callback(null, comments);
	} catch (error) {
		models.sequelize.close();
		callback(error);
	}
}
const models = require('alert-facebook-scraper-shared-models');
const getPosts  = require('./lib/getPosts');
const scrapePostDeletions  = require('./lib/scrapePostDeletions');
const savePostDeletions  = require('./lib/savePostDeletions');
const markPostDeletionsAsScraped  = require('./lib/markPostDeletionsAsScraped');

module.exports.handler = async (event, context, callback) => {

	try {
		let posts = await getPosts(5);
		let deletedPostIds = await scrapePostDeletions(posts);
		
		await savePostDeletions(deletedPostIds);
		await markPostDeletionsAsScraped(posts);

		console.log('Posts length: ' + posts.length);
		console.log('Deletions length: ' + deletedPostIds.length);


		// close the database connection
		models.sequelize.close();
		callback(null, deletedPostIds);
	} catch (error) {
		models.sequelize.close();
		callback(error);
	}
}
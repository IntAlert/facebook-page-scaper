const models = require('alert-facebook-scraper-shared-models');
const getPosts  = require('./lib/getPosts');
const scrapePostVisibilityChanges  = require('./lib/scrapePostVisibilityChanges');
const savePostVisibilityChanges  = require('./lib/savePostVisibilityChanges');
const markPostVisibilitiesAsScraped  = require('./lib/markPostVisibilitiesAsScraped');

module.exports.handler = async (event, context, callback) => {

	try {
		let posts = await getPosts(5);
		let deltas = await scrapePostVisibilityChanges(posts);
		
		await savePostVisibilityChanges(deltas);
		await markPostVisibilitiesAsScraped(posts);

		console.log('Posts length: ' + posts.length);


		// close the database connection
		models.sequelize.close();
		callback(null, deltas);
	} catch (error) {
		models.sequelize.close();
		callback(error);
	}
}
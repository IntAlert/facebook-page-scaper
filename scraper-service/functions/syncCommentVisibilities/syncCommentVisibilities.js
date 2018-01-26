const models = require('alert-facebook-scraper-shared-models');
const getComments  = require('./lib/getComments');
const scrapeCommentVisibilityChanges  = require('./lib/scrapeCommentVisibilityChanges');
const saveCommentVisibilityChanges  = require('./lib/saveCommentVisibilityChanges');
const markCommentVisibilitiesAsScraped  = require('./lib/markCommentVisibilitiesAsScraped');

module.exports.handler = async (event, context, callback) => {

	try {
		let comments = await getComments(5);
		let deltas = await scrapeCommentVisibilityChanges(comments);
		
		await saveCommentVisibilityChanges(deltas);
		await markCommentVisibilitiesAsScraped(comments);

		console.log('Comments length: ' + comments.length);


		// close the database connection
		models.sequelize.close();
		callback(null, deltas);
	} catch (error) {
		models.sequelize.close();
		callback(error);
	}
}
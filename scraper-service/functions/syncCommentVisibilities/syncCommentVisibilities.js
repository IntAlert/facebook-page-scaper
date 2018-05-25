const models = require('alert-facebook-scraper-shared-models');
const getComments  = require('./lib/getComments');
const scrapeCommentVisibilityChanges  = require('./lib/scrapeCommentVisibilityChanges');
const saveCommentVisibilityChanges  = require('./lib/saveCommentVisibilityChanges');
const markCommentVisibilitiesAsScraped  = require('./lib/markCommentVisibilitiesAsScraped');


module.exports.handler = async (event, context, callback) => {

	models.init();
	
	try {
		let comments = await getComments(5);
		let deltas = await scrapeCommentVisibilityChanges(comments);
		
		await saveCommentVisibilityChanges(deltas);
		await markCommentVisibilitiesAsScraped(comments);

		let comment_ids = comments.map(comment => comment.id)
		console.log('Comments length: ' + comments.length);
		console.log('Comment IDs: ' + comment_ids.join(', '));


		// do not close the database connection
		models.sequelize.close();
		callback(null, deltas);
	} catch (error) {
		models.sequelize.close();
		callback(error);
	}
}
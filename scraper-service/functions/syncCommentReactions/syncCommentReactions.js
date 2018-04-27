const models = require('alert-facebook-scraper-shared-models');
const getComments  = require('./lib/getComments');
const scrapeCommentReactions  = require('./lib/scrapeCommentReactions');
const saveCommentReactions  = require('./lib/saveCommentReactions');
const updateCommentReactionSummaries  = require('./lib/updateCommentReactionSummaries');
const markCommentReactionsAsScraped  = require('./lib/markCommentReactionsAsScraped');



module.exports.handler = async (event, context, callback) => {

	models.init();
	
	try {
		let comments = await getComments(5);
		let reactions = await scrapeCommentReactions(comments);
		let reactionRecords = await saveCommentReactions(reactions.all);
		let summaryRecords = await updateCommentReactionSummaries(reactions.summaries);

		await markCommentReactionsAsScraped(comments);

		console.log('Comments length: ' + comments.length);
		console.log('Reaction Records length: ' + reactionRecords.length);
		console.log('Summary Records length: ' + summaryRecords.length);


		// close the database connection
		models.sequelize.close();
		callback(null, reactions);
	} catch (error) {
		models.sequelize.close();
		callback(error);
	}
}
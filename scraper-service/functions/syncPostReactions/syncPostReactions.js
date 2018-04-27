const models = require('alert-facebook-scraper-shared-models');
const getPosts  = require('./lib/getPosts');
const scrapePostReactions  = require('./lib/scrapePostReactions');
const savePostReactions  = require('./lib/savePostReactions');
const updatePostReactionSummaries  = require('./lib/updatePostReactionSummaries');
const markPostReactionsAsScraped  = require('./lib/markPostReactionsAsScraped');

module.exports.handler = async (event, context, callback) => {

	models.init();
	
	try {
		let posts = await getPosts(5);
		let reactions = await scrapePostReactions(posts);
		let reactionRecords = await savePostReactions(reactions.all);
		let summaryRecords = await updatePostReactionSummaries(reactions.summaries);

		await markPostReactionsAsScraped(posts);

		console.log('Posts length: ' + posts.length);
		console.log('Reactions length: ' + reactions.length);
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
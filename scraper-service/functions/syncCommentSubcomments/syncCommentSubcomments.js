const models = require('alert-facebook-scraper-shared-models');
const getComments  = require('./lib/getComments');
const scrapeSubcomments  = require('./lib/scrapeSubcomments');
const saveSubcomments  = require('./lib/saveSubcomments');
const markCommentsAsScraped = require('./lib/markCommentsAsScraped');

module.exports.handler = async (event, context, callback) => {

	models.init();

	try {
		let comments = await getComments(10);
		let subcomments = await scrapeSubcomments(comments);
		let records = await saveSubcomments(subcomments);
		console.log('Comments length: ' + comments.length);
		console.log('Sub-comments length: ' + subcomments.length);

		await markCommentsAsScraped(comments);
		
		// close the database connection
		models.sequelize.close();
		callback(null, subcomments);
	} catch (error) {
		models.sequelize.close();
		callback(error);
	}

}
const models = require('alert-facebook-scraper-shared-models');
const scrapePosts  = require('./lib/scrapePosts');
const savePosts  = require('./lib/savePosts');
const getPage  = require('./lib/getPage');
const markPageAsScraped  = require('./lib/markPageAsScraped');

module.exports.handler = async (event, context, callback) => {

	models.init();

	try {
		let page = await getPage();
		let posts = await scrapePosts(page);
		let records = await savePosts(page, posts);
		await markPageAsScraped(page);
		console.log('Page id: ' + page.fb_id);
		console.log('Feed items received: ' + posts.length);
		console.log('Records saved : ' + records.length);

		// close the database connection
		models.sequelize.close();
		callback(null, records);

	} catch (error) {
		models.sequelize.close();
		callback(error);
	}
	
}
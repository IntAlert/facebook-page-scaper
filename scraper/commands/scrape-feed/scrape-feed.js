const scrapePosts  = require('./lib/scrapePosts');
const savePosts  = require('./lib/savePosts');
const getPage  = require('./lib/getPage');
const markPageAsScraped  = require('./lib/markPageAsScraped');

module.exports = async () => {
	let page = await getPage();
	let posts = await scrapePosts(page);
	let records = await savePosts(posts);
	await markPageAsScraped(page);
	console.log('Page id: ' + page.fb_id);
	console.log('Feed items received: ' + posts.length);
	console.log('Records saved : ' + records.length);
	return records;
}
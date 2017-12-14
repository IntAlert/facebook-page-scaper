const getPosts  = require('./lib/getPosts');
const scrapeComments  = require('./lib/scrapeComments');
const saveComments  = require('./lib/saveComments');
const markPostsAsScraped = require('./lib/markPostsAsScraped');

module.exports = async () => {
	let posts = await getPosts(10);
	let comments = await scrapeComments(posts);
	let records = await saveComments(comments);
	console.log('Posts length: ' + posts.length);
	console.log('Comments length: ' + comments.length);
	// console.log('Records saved : ' + records.length);
	// return posts;

	await markPostsAsScraped(posts)

	return comments;
}
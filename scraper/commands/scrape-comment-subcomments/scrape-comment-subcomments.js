const getComments  = require('./lib/getComments');
const scrapeSubcomments  = require('./lib/scrapeSubcomments');
const saveSubcomments  = require('./lib/saveSubcomments');
const markCommentsAsScraped = require('./lib/markCommentsAsScraped');

module.exports = async () => {
	let comments = await getComments(10);
	let subcomments = await scrapeSubcomments(comments);
	let records = await saveSubcomments(comments);
	console.log('Comments length: ' + comments.length);
	console.log('Sub-comments length: ' + subcomments.length);

	await markCommentsAsScraped(subcomments);

	return subcomments;
}
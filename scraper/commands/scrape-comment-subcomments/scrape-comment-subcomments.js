const getComments  = require('./lib/getComments');
const scrapeSubcomments  = require('./lib/scrapeSubcomments');
const saveSubcomments  = require('./lib/saveSubcomments');
const markCommentsAsScraped = require('./lib/markCommentsAsScraped');

module.exports = async () => {
	let comments = await getComments(100);
	let subcomments = await scrapeSubcomments(comments);
	let records = await saveSubcomments(subcomments);
	console.log('Comments length: ' + comments.length);
	console.log('Sub-comments length: ' + subcomments.length);

	await markCommentsAsScraped(comments);

	return subcomments;
}
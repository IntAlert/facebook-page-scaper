const getComments  = require('./lib/getComments');
const scrapeStatuses  = require('./lib/scrapeStatuses');
const saveCommentStatuses  = require('./lib/saveCommentStatuses');

module.exports = async () => {
	let comments = await getComments(1);
	let statuses = await scrapeStatuses(comments);
	let records = await saveCommentStatuses(statuses);
	console.log('Comments length: ' + comments.length);
	console.log('Statuses length: ' + statuses.length);
	console.log('Records length: ' + records.length);

	return statuses;
}
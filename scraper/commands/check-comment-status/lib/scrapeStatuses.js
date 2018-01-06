const FBClient = require('../../../shared/FBClient')

const comments = [];

const scrapeStatus = async (comment) => {
	let endpoint = `${comment.fb_id}/reactions`;

	return new Promise((resolve, reject) => {
		FBClient.api(endpoint, (res) => {
			if(!res || res.error) {
				reject(res.error)
			}
			
			resolve(res);
		});
	})
}

const scrapeStatuses = async(comments) => {
	let after_cursor;
	let all_statuses = [];

	for(let comment of comments) {
		let statuses = await scrapeStatus(comment);
		all_statuses = all_statuses.concat(statuses);
	}

	return all_statuses;
}

module.exports = scrapeStatuses;

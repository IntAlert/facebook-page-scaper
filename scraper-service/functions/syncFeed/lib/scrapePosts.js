const FBClient = require('../../../lib/FBClient')

const posts = [];

const scrapePostsPaginated = async (page, after_cursor) => {
	let endpoint = `${page.fb_id}/feed`;

	if(after_cursor) {
		endpoint += '?after=' + after_cursor;
	}
	
	return new Promise((resolve, reject) => {
		// set access token
		FBClient.setAccessToken(page.access_token);

		// make API call to Facebook
		FBClient.api(endpoint, (res) => {
			if(!res || res.error) {
				reject(res.error)
			}
			resolve(res);
		});
	})
}

const scrapePostsByPage = async(page) => {
	let after_cursor;
	let posts = [];
	do {
		let results = await scrapePostsPaginated(page, after_cursor);
		posts = posts.concat(results.data);
		after_cursor = results.paging ? results.paging.cursors.after : false;
	} while (after_cursor)

	return posts;
}

const scrapePosts = async(page) => {
	try {
		return await scrapePostsByPage(page);
	} catch (error) {
		// if see an error here, we just ignore it
		// we no longer have access to this page
		console.log("Page access error: Page ID " + page.fb_id);
		console.error(error);
		return [];
	}
}

module.exports = scrapePosts;
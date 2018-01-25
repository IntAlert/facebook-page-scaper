const FBClient = require('../../shared/FBClient')

const getPageAccessToken = async (comment) => {
	let page_id = 'alertfeedscraper';
	let endpoint = `${page_id}?fields=access_token`; 

	return new Promise((resolve, reject) => {
		FBClient.api(endpoint, (res) => {
			if(!res || res.error) {
				reject(res.error)
			}

			if (!res.access_token) {
				reject("getPageAccessToken: Access Token not returned")
			}
			
			resolve(res.access_token);
		});
	})
}

module.exports = getPageAccessToken;

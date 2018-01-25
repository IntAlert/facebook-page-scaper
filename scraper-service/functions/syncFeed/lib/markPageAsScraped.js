const models = require('alert-facebook-scraper-shared-models');
const markPageAsScraped = async (page) => {

	return models.Page.update({
		last_scraped: Date.now()
	}, {
		where: {
			'id': page.id
		}
	})
}

module.exports = markPageAsScraped;

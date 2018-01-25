const models = require('alert-facebook-scraper-shared-models');
const getPage = async () => {

	let page = await getPageNotScraped();

	if (!page) {
		page = await getPageLeastRecentlyScraped();
	}

	return page;
}


const getPageNotScraped = async () => {

	return models.Page.findOne({
		where: {
			last_scraped: null,
			disabled: false
		},
		include: [{
			model: models.Post,
		}]
	})

}

const getPageLeastRecentlyScraped = async () => {
	
	return models.Page.findOne({
		where: {
			last_scraped: {$ne: null},
			disabled: false
		},
		order: [['last_scraped', 'ASC']],
		include: [{
			model: models.Post,
		}]
	})

}

module.exports = getPage;
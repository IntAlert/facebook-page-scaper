var models  = require('../../../models');
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
		}
	})

}

const getPageLeastRecentlyScraped = async () => {
	
	return models.Page.findOne({
		where: {
			disabled: false
		},
		order: [['last_scraped', 'ASC']]
	})

}

module.exports = getPage;
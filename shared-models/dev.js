require('dotenv').config()
const models = require('./models');

models.Post.findAll({
	where: {
		comments_last_scraped: null,
	},
	include: [{
		model: models.Page,
	}],
	raw: true
}).then(posts => {
	console.log(posts);
})
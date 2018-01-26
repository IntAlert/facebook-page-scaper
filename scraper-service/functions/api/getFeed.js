const models = require('alert-facebook-scraper-shared-models');


module.exports.handler = async (event, context, callback) => {

	let page = await models.Page.findOne({
		where: {
			id: 2
		},
		include: [{
			model: models.Post,
			include: [
				{
					model: models.post_reactions
				},
				{
					model: models.Comment,
					include: [
						{
							model: models.comment_reactions
						},
						{
							model: models.Comment,
							include: [
								{
									model: models.comment_reactions
								},
							]
						},
					]
				},
			]
		}]
	})

	// close the database connection
	models.sequelize.close();

	// build response
	const response = {
		statusCode: 200,
		body: JSON.stringify({page})
	};

	callback(null, response);

}

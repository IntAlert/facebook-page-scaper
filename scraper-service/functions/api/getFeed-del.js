const models = require('alert-facebook-scraper-shared-models');


module.exports.handler = async (event, context, callback) => {

	models.init();

	let page_id = 1;

	let page = await models.Page.findOne({ //here
		where: {
			id: page_id
		},
	})

	let posts = await models.Post.findAll({ //here
		where: {
			parent_page_id: page_id
		},
		order: [['fb_created_time', 'DESC']],
		limit: 5,
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
	})

	// close the database connection
	models.sequelize.close();

	// build response
	const response = {
		statusCode: 200,
		headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
		body: JSON.stringify({page, posts})
	};

	callback(null, response);

}

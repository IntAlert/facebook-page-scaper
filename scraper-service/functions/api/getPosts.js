const models = require('alert-facebook-scraper-shared-models');


module.exports.handler = async (event, context, callback) => {

	models.init();

	let page_id = 1;

	let posts = await models.Post.findAll({ //here
		where: {
			parent_page_id: page_id
		},
		include: [
			{
				model: models.post_reactions
			},
		],
		order: [['fb_created_time', 'DESC']],

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
		body: JSON.stringify({posts})
	};

	callback(null, response);

}

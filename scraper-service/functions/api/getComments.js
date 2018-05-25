const models = require('alert-facebook-scraper-shared-models');


module.exports.handler = async (event, context, callback) => {

	models.init();

	let post_id = event.queryStringParameters.post_id;
	// let post_id = 5;

	let comments = await models.Comment.findAll({ //here
		where: {
			parent_post_id: post_id
		},
		include: [
			{
				model: models.comment_reactions
			},
			{
				model: models.Comment,
				as: 'Subcomment',
				include: [
					{
						model: models.comment_reactions
					},
				]
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
		body: JSON.stringify({event, comments})
	};

	callback(null, response);

}

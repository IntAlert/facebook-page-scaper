const models = require('alert-facebook-scraper-shared-models');
const toCSV = require('array-to-csv')

module.exports.handler = async (event, context, callback) => {

	models.init();

	let post_id = event.queryStringParameters.post_id;

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

	// build CSV
	let rows = [];

	// define fields to export
	// with readable titles
	const fields = {
		"fb_created_time" : "Created",
		"fb_id" : "Comment ID",
		"parent_post_fb_id" : "Post ID",
		"parent_comment_fb_id": "Parent Comment ID",

    "deleted": "Is Deleted",
    "is_hidden": "Is Hidden",
    
    "fb_message": "Message",

    "fb_user_fullname": "Author",
    "fb_user_id": "Author ID",

    "fb_reactions_total_count": "Reaction Count",
    "fb_reactions_summary_type": "Reaction Summary",

    "comments_last_scraped": "Comments Last Scraped",
		"reactions_last_scraped": "Reactions Last Scraped",
		"visibility_last_scraped": "Visibility Last Scraped",
		"is_hidden_detected": "Hidden Detected Time",
    "deletion_detected": "Deleted Detected Time",
		
	};

	// build header
	const headerRow = fields.values();

	// build rows
	for(comment of comments) {
		// parent comment
		let commentRow = [];
		for (const key in fields) {
			commentRow.push(comment[key])
		}
		rows.push(commentRow);

		// subcomments
		for (subcomment of comment.Comment) {
			let subcommentRow = [];
			for (const key in fields) {
				commentRow.push(comment[key])
			}
			rows.push(commentRow);
		}
	}

	// build response
	const response = {
		statusCode: 200,
		headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
		body: toCSV(rows)
	};

	callback(null, response);

}

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
				model: models.comment_reactions,
			},
			{
				model: models.Comment,
				as: 'Subcomment',
				include: [
					{
						model: models.comment_reactions,
						nested: true,
					},
				]
			},
		],
		order: [['fb_created_time', 'DESC']],
	}).map(el => el.get({plain:true})) // get plain objects

	// add reaction counts to each
	for (let comment of comments) {
		addFlattenedReactionCounts(comment);
		for (let subcomment of comment.Subcomment) {
			addFlattenedReactionCounts(subcomment);
		}
	}


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

    

    "comments_last_scraped": "Comments Last Scraped",
		"reactions_last_scraped": "Reactions Last Scraped",
		"visibility_last_scraped": "Visibility Last Scraped",
		"is_hidden_detected": "Hidden Detected Time",
		"deletion_detected": "Deleted Detected Time",
		
		"fb_reactions_total_count": "Reaction Count: Total",
		"reaction_count_LIKE": "Reaction Count: LIKE",
		"reaction_count_LOVE": "Reaction Count: LOVE",
		"reaction_count_WOW": "Reaction Count: WOW",
		"reaction_count_HAHA": "Reaction Count: HAHA",
		"reaction_count_SAD": "Reaction Count: SAD",
		"reaction_count_ANGRY": "Reaction Count: ANGRY",
		"reaction_count_THANKFUL": "Reaction Count: THANKFUL",
		
	};

	// build header
	const headerRow = Object.values(fields);
	rows.push(headerRow);

	// build rows
	comments.forEach((comment) => {

		// parent comment
		let commentRow = [];
		for (const key in fields) {
			commentRow.push(comment[key])
		}
		rows.push(commentRow);

		// subcomments
		for (let subcomment of comment.Subcomment) {
			let subcommentRow = [];
			for (const key in fields) {
				subcommentRow.push(subcomment[key])
			}
			rows.push(subcommentRow);
		}

	})

	// add a Facebook link to each row
	rows = rows.map((row) => {
		let comment_id = row[1];
		row.unshift(`https://www.facebook.com/${comment_id}`);
		return row;
	})

	// build response
	const response = {
		statusCode: 200,
		headers: {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Credentials': true,
		'Content-type': 'text/csv',
		'Content-disposition': `attachment;filename=Comments${post_id}.csv`,
    },
		body: toCSV(rows)
	};


	// close the database connection
	models.sequelize.close();

	callback(null, response);

}



const addFlattenedReactionCounts = (comment) => {
	let counts = {
		"reaction_count_LIKE": 0,
		"reaction_count_LOVE": 0,
		"reaction_count_WOW": 0,
		"reaction_count_HAHA": 0,
		"reaction_count_SAD": 0,
		"reaction_count_ANGRY": 0,
		"reaction_count_THANKFUL": 0,
	}

	for(const reaction of comment.comment_reactions) {
		switch(reaction.fb_reaction_type) {
			case 'LIKE':
				counts.reaction_count_LIKE++;
				break;
			case 'LOVE':
				counts.reaction_count_LOVE++;
				break;
			case 'WOW':
				counts.reaction_count_WOW++;
				break;
			case 'HAHA':
				counts.reaction_count_HAHA++;
				break;
			case 'SAD':
				counts.reaction_count_SAD++;
				break;
			case 'ANGRY':
				counts.reaction_count_ANGRY++;
				break;
			case 'THANKFUL':
				counts.reaction_count_THANKFUL++;
				break;
		}
		
	}

	Object.assign(comment, counts);

	return comment;
}
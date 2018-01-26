const models = require('alert-facebook-scraper-shared-models');
const saveReactions = async (reactions) => {

	let records = [];

	for(let reaction of reactions) {
		let record = await saveReaction(reaction);
		records.push(record);
	}

	return records;
}

const saveReaction = async (reaction) => {

	// define criteria to find an existing reaction for a given user
	let where = {
		comment_id: reaction.comment_id,
		fb_user_id: reaction.id,
	};

	// upsert as people may have changed their reaction
	// edge case but useful for testing
	return models.comment_reactions.find({where})
		.then(record => {
			if (!record) {
				// create the record
				return models.comment_reactions.create({
					comment_id: reaction.comment_id,
					fb_user_id: reaction.id,
					fb_reaction_type: reaction.type,
					fb_user_fullname: reaction.name,
				})
			} else {
				if (record.fb_reaction_type != reaction.type) {
					// update the record and change the reaction type
					return models.comment_reactions.update({
						fb_reaction_type: reaction.type,
					}, {where});
				}
			}

			// if we made it this far, no need to upsert record
			return record;
		})
}


module.exports = saveReactions;

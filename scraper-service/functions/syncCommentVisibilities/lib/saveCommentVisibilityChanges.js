const models = require('alert-facebook-scraper-shared-models');

const saveCommentVisibilityChanges = async (deltas) => {
	
	if (deltas.deleted_comment_ids.length)	await saveCommentDeletions(deltas.deleted_comment_ids);
	if (deltas.is_hidden_comment_ids.length)	await saveCommentHiddens(deltas.is_hidden_comment_ids);
	if (deltas.is_unhidden_comment_ids.length)	await saveCommentUnhiddens(deltas.is_unhidden_comment_ids);

}

const saveCommentDeletions = async (deleted_comment_ids) => {
	
	return models.Comment.update({
		deleted: true,
		deletion_detected: Date.now()
	}, {
		where: {
			'id': deleted_comment_ids
		}
	})
}

const saveCommentHiddens = async (is_hidden_comment_ids) => {
	
	return models.Comment.update({
		is_hidden: true,
		is_hidden_detected: Date.now()
	}, {
		where: {
			'id': is_hidden_comment_ids
		}
	})
}

const saveCommentUnhiddens = async (is_unhidden_comment_ids) => {
	
	return models.Comment.update({
		is_hidden: true,
		is_hidden_detected: Date.now()
	}, {
		where: {
			'id': is_unhidden_comment_ids
		}
	})
}

module.exports = saveCommentVisibilityChanges;

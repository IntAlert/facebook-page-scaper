const models = require('alert-facebook-scraper-shared-models');

const saveCommentVisibilityChanges = async (deltas) => {
	
	await saveCommentDeletions(deltas.deleted_comment_ids);
	await saveCommentUnhiddens(deltas.undeleted_comment_ids);

	await saveCommentHiddens(deltas.is_hidden_comment_ids);
	await saveCommentUnhiddens(deltas.is_unhidden_comment_ids);

}

const saveCommentDeletions = async (deleted_comment_ids) => {

	if (!deleted_comment_ids.length) return;
	
	return models.Comment.update({
		deleted: true,
		deletion_detected: Date.now()
	}, {
		where: {
			'id': deleted_comment_ids
		}
	})
}

const saveCommentUndeletions = async (undeleted_comment_ids) => {

	if (!undeleted_comment_ids.length) return;
	
	return models.Comment.update({
		deleted: false,
		deletion_detected: Date.now()
	}, {
		where: {
			'id': undeleted_comment_ids
		}
	})
}

const saveCommentHiddens = async (is_hidden_comment_ids) => {

	if (!is_hidden_comment_ids.length) return;
	
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

	if (!is_unhidden_comment_ids.length) return;
	
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

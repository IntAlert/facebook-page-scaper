const models = require('alert-facebook-scraper-shared-models');

const savePostVisibilityChanges = async (deltas) => {
	
	await savePostDeletions(deltas.deleted_post_ids);
	await savePostUndeletions(deltas.undeleted_post_ids);
	
	await savePostHiddens(deltas.is_hidden_post_ids);
	await savePostUnhiddens(deltas.is_unhidden_post_ids);

}

const savePostDeletions = async (deleted_post_ids) => {

	if (!deleted_post_ids.length) return;
	
	return models.Post.update({
		deleted: true,
		deletion_detected: Date.now()
	}, {
		where: {
			'id': deleted_post_ids
		}
	})
}

const savePostUndeletions = async (undeleted_post_ids) => {

	if (!undeleted_post_ids.length) return;
	
	return models.Post.update({
		deleted: false,
		deletion_detected: Date.now()
	}, {
		where: {
			'id': undeleted_post_ids
		}
	})
}

const savePostHiddens = async (is_hidden_post_ids) => {

	if (!is_hidden_post_ids.length) return;
	
	return models.Post.update({
		is_hidden: true,
		is_hidden_detected: Date.now()
	}, {
		where: {
			'id': is_hidden_post_ids
		}
	})
}

const savePostUnhiddens = async (is_unhidden_post_ids) => {

	if (!is_unhidden_post_ids.length) return;
	
	return models.Post.update({
		is_hidden: true,
		is_hidden_detected: Date.now()
	}, {
		where: {
			'id': is_unhidden_post_ids
		}
	})
}

module.exports = savePostVisibilityChanges;

const models = require('alert-facebook-scraper-shared-models');

const savePostVisibilityChanges = async (deltas) => {
	
	if (deltas.deleted_post_ids.length)	await savePostDeletions(deltas.deleted_post_ids);
	if (deltas.is_hidden_post_ids.length)	await savePostHiddens(deltas.is_hidden_post_ids);
	if (deltas.is_unhidden_post_ids.length)	await savePostUnhiddens(deltas.is_unhidden_post_ids);

}

const savePostDeletions = async (deleted_post_ids) => {
	
	return models.Post.update({
		deleted: true,
		deletion_detected: Date.now()
	}, {
		where: {
			'id': deleted_post_ids
		}
	})
}

const savePostHiddens = async (is_hidden_post_ids) => {
	
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

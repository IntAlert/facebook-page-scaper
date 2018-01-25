const models = require('alert-facebook-scraper-shared-models');
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

module.exports = savePostDeletions;

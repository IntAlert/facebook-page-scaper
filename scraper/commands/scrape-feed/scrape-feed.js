const getPosts  = require('./lib/getPosts');
const savePosts  = require('./lib/savePosts');

module.exports = async () => {
	let posts = await getPosts();
	let records = await savePosts(posts);
	console.log('Feed items received: ' + posts.length);
	console.log('Records saved : ' + records.length);
	return records;
}
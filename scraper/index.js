require('dotenv').config()
var models  = require('./models');
const scrapeFeed = require('./commands/scrape-feed/scrape-feed');
const scrapePostComments = require('./commands/scrape-post-comments/scrape-post-comments');
const scrapeCommentSubcomments = require('./commands/scrape-comment-subcomments/scrape-comment-subcomments');

// For development/testing purposes
exports.handler = async (event, context, callback) => {
  console.log('Scraping all page feed posts/stories');
  console.log('==================================');
  console.log('event', event);
  console.log('==================================');


  let result;

  try {
    switch (event.command) {
      case 'scrape-feed':
        result = await scrapeFeed();
        break;
      case 'scrape-post-comments':
        result = await scrapePostComments();
        break;

      case 'scrape-comment-subcomments':
        result = await scrapeCommentSubcomments();
        break;
    
      default:
        throw("Unknown Command: " + event.command)
        break;
    }

    // close the database connection
    models.sequelize.close();
    return result;

  } catch (error) {
    console.error(error);
    callback(error);
  }


  callback(null, result);
  
};
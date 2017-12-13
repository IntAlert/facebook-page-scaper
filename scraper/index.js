require('dotenv').config()
const scrapeFeed = require('./commands/scrape-feed/scrape-feed');

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
    
      default:
        throw("Unknown Command: " + event.command)
        break;
    }

  } catch (error) {
    callback(error);
    console.error(error);
  }


  callback(null, result);
  
};
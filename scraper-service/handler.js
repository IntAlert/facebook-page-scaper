const models = require('alert-facebook-scraper-shared-models');

export const hello = async (event, context, callback) => {
  let page = await models.Page.findOne();
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: page,
    }),
  };

  // close the database connection
  models.sequelize.close();

  callback(null, response);
};

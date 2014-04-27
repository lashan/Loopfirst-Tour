'use strict';

var index = require('./controllers');

/**
 * Application routes
 */
module.exports = function(app) {
  app.route('/tour')
    .get( index.index);
};

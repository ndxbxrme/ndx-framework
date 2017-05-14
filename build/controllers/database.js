(function() {
  'use strict';
  var ndx, superagent;

  ndx = require('../ndx.js');

  superagent = require('superagent');

  module.exports = {
    keywords: ['sql', 'props'],
    exec: function(cb) {
      if (['exit', 'quit', 'q', 'e', 'x'].indexOf(ndx.data.sql) !== -1) {
        return typeof cb === "function" ? cb(null, null) : void 0;
      }
      return ndx.getToken(function(err, token) {
        if (!err) {
          return superagent.post(ndx.data.host + "/api/database/exec").set('Authorization', "Bearer " + token).send({
            sql: ndx.data.sql,
            props: ndx.data.props,
            notCritical: false
          }).end(function(err, response) {
            if (!response.error) {
              console.log(JSON.stringify(JSON.parse(response.text), null, '  '));
            } else {
              console.log(response.error);
            }
            return typeof cb === "function" ? cb(null, 'database') : void 0;
          });
        } else {
          return typeof cb === "function" ? cb('not logged in') : void 0;
        }
      });
    },
    cleanup: function(cb) {
      ndx.data.sql = null;
      ndx.data.props = null;
      return typeof cb === "function" ? cb(null) : void 0;
    }
  };

}).call(this);

//# sourceMappingURL=database.js.map

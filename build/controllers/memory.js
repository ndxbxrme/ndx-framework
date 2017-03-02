(function() {
  'use strict';
  var ndx, superagent;

  ndx = require('../ndx');

  superagent = require('superagent');

  module.exports = {
    keywords: [],
    exec: function(cb) {
      return ndx.getToken(function(err, token) {
        if (!err) {
          return superagent.get(ndx.data.host + "/api/memory").set('Authorization', "Bearer " + token).send().end(function(err, response) {
            if (!response.error) {
              console.log(response.body.memory);
            } else {
              console.log(response.error);
            }
            return typeof cb === "function" ? cb(response.error) : void 0;
          });
        } else {
          return typeof cb === "function" ? cb('not logged in') : void 0;
        }
      });
    },
    cleanup: function(cb) {
      return typeof cb === "function" ? cb(null) : void 0;
    }
  };

}).call(this);

//# sourceMappingURL=memory.js.map

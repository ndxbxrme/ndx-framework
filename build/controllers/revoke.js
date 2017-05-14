(function() {
  'use strict';
  var ndx, superagent;

  ndx = require('../ndx.js');

  superagent = require('superagent');

  module.exports = {
    keywords: ['name', 'id', 'token'],
    exec: function(cb) {
      return ndx.getToken(function(err, token) {
        if (!err) {
          return superagent.post(ndx.data.host + "/api/revoke_cors_token").set('Authorization', "Bearer " + token).accept('text/json').send({
            name: ndx.data['name'],
            id: ndx.data['id'],
            token: ndx.data['token']
          }).end(function(err, response) {
            if (!err && !response.error) {
              console.log('revoked');
              return typeof cb === "function" ? cb(null, null) : void 0;
            } else {
              return typeof cb === "function" ? cb(response.error) : void 0;
            }
          });
        }
      });
    },
    cleanup: function(cb) {
      ndx.data['name'] = null;
      ndx.data['id'] = null;
      ndx.data['token'] = null;
      return typeof cb === "function" ? cb(null) : void 0;
    }
  };

}).call(this);

//# sourceMappingURL=revoke.js.map

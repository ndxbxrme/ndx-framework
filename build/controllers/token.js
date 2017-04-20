(function() {
  'use strict';
  var ndx, superagent;

  ndx = require('../ndx');

  superagent = require('superagent');

  module.exports = {
    keywords: ['name', 'hours'],
    exec: function(cb) {
      return ndx.getToken(function(err, token) {
        if (!err) {
          return superagent.post(ndx.data.host + "/api/generate_cors_token").set('Authorization', "Bearer " + token).accept('text/json').send({
            name: ndx.data['name'],
            hours: ndx.data['hours']
          }).end(function(err, response) {
            if (!err && !response.error) {
              console.log('token:');
              console.log(response.body.token);
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
      return ndx.data['hours'] = null;
    }
  };

}).call(this);

//# sourceMappingURL=token.js.map

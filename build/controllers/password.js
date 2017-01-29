(function() {
  'use strict';
  var ndx, superagent;

  ndx = require('../ndx');

  superagent = require('superagent');

  module.exports = {
    keywords: ['old password', 'new password'],
    exec: function(cb) {
      return ndx.getToken(function(err, token) {
        if (!err) {
          return superagent.post(ndx.data.host + "/api/update-password").set('Authorization', "Bearer " + token).accept('text/json').send({
            oldPassword: ndx.data['old password'],
            newPassword: ndx.data['new password']
          }).end(function(err, response) {
            if (!err && !response.error) {
              console.log('password updated successfully');
              return typeof cb === "function" ? cb(null, null) : void 0;
            } else {
              return typeof cb === "function" ? cb(response.error) : void 0;
            }
          });
        }
      });
    },
    cleanup: function(cb) {
      ndx.data['old password'] = null;
      ndx.data['new password'] = null;
      return typeof cb === "function" ? cb(null) : void 0;
    }
  };

}).call(this);

//# sourceMappingURL=password.js.map

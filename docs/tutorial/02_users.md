# 02 - users
- stop the app by hitting Ctrl-C twice and cd into the project directory  
`cd tutorial`  
- add the [ndx-auth](https://github.com/ndxbxrme/ndx-auth-client) client  
`bower install --save ndx-auth`  
- scaffold a simple login directive  
`yo ndx:login`  
- add it to `src/client/index.jade`, make a logout button and hide the main page if not logged in  

```jade
  body(ng-app='tutorial')
    login
    .body(ng-show='auth.getUser()')
      .logout
        a(href='/api/logout', target='_self) Log out
      .view(ui-view='')
```

- install [ndx-passport](https://github.com/ndxbxrme/ndx-passport) for serverside email/password login  
`npm install --save ndx-passport`  
- and add it to `src/server/app.coffee`.  

```coffeescript
'use strict'

ndx = require 'ndx-server'
.config
  database: 'db'
  tables: ['users']
  localStorage: './data'
.use 'ndx-passport'
.use 'ndx-static-routes'
.start()
```

- alter the routes to resolve the user  
`src/client/routes/dashbard/dashboard.routes.coffee`  

```coffeescript
'use strict'

angular.module 'tutorial'
.config ($stateProvider) ->
  $stateProvider
  .state 'dashboard',
    url: '/'
    templateUrl: 'routes/dashboard/dashboard.html'
    controller: 'DashboardCtrl'
    resolve:
      user: (auth) ->
        auth.getPromise()
```

- start your app back up by typing `grunt`
- you should now be able to sign up and log in
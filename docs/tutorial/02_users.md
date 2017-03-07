### index
- [01 - getting started](https://ndxbxrme.github.io/ndx-framework/docs/tutorial/01_getting_started.html)
- [02 - users](https://ndxbxrme.github.io/ndx-framework/docs/tutorial/02_users.html)
- [03 - rest api](https://ndxbxrme.github.io/ndx-framework/docs/tutorial/03_rest_api.html)

# 02 - users
- stop the app by hitting Ctrl-C twice and cd into the project directory  
`cd tutorial`  
- add the [ndx-auth](https://github.com/ndxbxrme/ndx-auth-client) client  
`bower install --save ndx-auth`  
- scaffold a simple login directive  
`yo ndx:login`  
- add it to `src/client/index.jade`, make a logout button and hide the main page if not logged in  

#### `src/client/index.jade`
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

#### `src/server/app.coffee`
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

#### `src/client/routes/dashbard/dashboard.routes.coffee`  

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

### [next > >](https://ndxbxrme.github.io/ndx-framework/docs/tutorial/03_restapi.html)

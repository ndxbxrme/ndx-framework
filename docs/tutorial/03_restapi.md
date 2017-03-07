# rest api
- make a module to add some data to the database  
`npm install --save chance`  

#### `src/server/services/startup.coffee`  

```coffeescript
'use strict'

Chance = require 'chance'
chance = new Chance()

module.exports = (ndx) ->
  ndx.database.on 'ready', ->
    if not ndx.database.count 'people'
      i = 0
      while i++ < 50
        ndx.database.insert 'people', 
          name: chance.name()
          email: chance.email()
```  
- create a new database table in ndx-server.config() and add your module to the .use list  

#### `src/server/app.coffee`  

```coffeescript
'use strict'

ndx = require 'ndx-server'
.config
  database: 'db'
  tables: ['users', 'people']
  localStorage: './data'
.use require './services/startup'
.use 'ndx-passport'
.use 'ndx-rest'
.use 'ndx-static-routes'
.start()
```

- install the [ndx-rest](https://github.com/ndxbxrme/ndx-rest-client) client  
`bower install --save ndx-rest`  

- subscribe to the `people` table  

#### `src/client/routes/dashboard/dashboard.ctrl.coffee`

```coffeescript
'use strict'

angular.module 'tutorial'
.controller 'DashboardCtrl', ($scope) ->
  $scope.people = $scope.list 'people'
```  

- render the results in the view  

#### `src/client/routes/dashboard/dashboard.jade`  

```jade
.dashboard 
  h2 my people
  p(ng-repeat='person in people.items') {{person.name}}
```

- start the app with `grunt` and you should see a list of people:)
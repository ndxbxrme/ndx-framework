### index
- [01 - getting started](https://ndxbxrme.github.io/ndx-framework/docs/tutorial/01_getting_started)
- [02 - users](https://ndxbxrme.github.io/ndx-framework/docs/tutorial/02_users)
- _[03 - rest api](https://ndxbxrme.github.io/ndx-framework/docs/tutorial/03_restapi)_
- [04 - pagination and sorting](https://ndxbxrme.github.io/ndx-framework/docs/tutorial/04_paging_and_sorting)
- [05 - search and delete](https://ndxbxrme.github.io/ndx-framework/docs/tutorial/05_search_and_delete)
- [06 - live data](https://ndxbxrme.github.io.ndx-framework/docs/tutorial/06_live_data)

# rest api
### data
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
### server
- create a new database table in ndx-server.config() and add your module and [ndx-rest](https://github.com/ndxbxrme/ndx-rest) to the .use list  
`npm install --save ndx-rest`  

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

### rest client
- install the [ndx-rest](https://github.com/ndxbxrme/ndx-rest-client) client  
`bower install --save ndx-rest`  

- list objects from the `people` table  

#### `src/client/routes/dashboard/dashboard.ctrl.coffee`

```coffeescript
'use strict'

angular.module 'tutorial'
.controller 'DashboardCtrl', ($scope) ->
  $scope.people = $scope.list 'people'
```  

- render the results in the view  

#### `src/client/routes/dashboard/dashboard.jade`  

```pug
.dashboard 
  h2 my people
  p(ng-repeat='person in people.items') { { person.name }}
```

- start the app with `grunt` and you should see a list of people:)


### [next > >](https://ndxbxrme.github.io/ndx-framework/docs/tutorial/04_paging_and_sorting)

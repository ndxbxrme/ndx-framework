### index
- [01 - getting started](https://ndxbxrme.github.io/ndx-framework/docs/tutorial/01_getting_started.html)
- [02 - users](https://ndxbxrme.github.io/ndx-framework/docs/tutorial/02_users.html)
- [03 - rest api](https://ndxbxrme.github.io/ndx-framework/docs/tutorial/03_restapi.html)
- [04 - pagination and search](https://ndxbxrme.github.io/ndx-framework/docs/tutorial/04_paging_and_searching.html)

# pagination and search
### options
- add an options object to the `list` function  

#### `src/client/routes/dashboard/dashboard.ctrl.coffee`  

```coffeescript
'use strict'

angular.module 'tutorial'
.controller 'DashboardCtrl', ($scope) ->
  $scope.peopleOpts =
    page: 1
    pageSize: 10
  $scope.people = $scope.list 'people', $scope.peopleOpts
```

- your app should now only show 10 people  

### pagination
- now lets paginate the people list  
`bower install --save ndx-pagination`  

#### `src/client/routes/dashboard/dashboard.jade` 

```jade
.dashboard
  h2 my people
  p(ng-repeat='person in people.items') {{ person.name }}
  pagination(ng-model='peopleOpts.page', total='people.total', page-size='peopleOpts.pageSize')
```
- you should now be able to page through the people  

### search
- add a `where` object to the list options  

#### `src/client/routes/dashboard/dashboard.ctrl.coffee`  

```coffeescript
'use strict'

angular.module 'tutorial'
.controller 'DashboardCtrl', ($scope) ->
  $scope.search =
    $like: ''
  $scope.peopleOpts =
    where:
      name: $scope.search
  $scope.people = $scope.list 'people', $scope.peopleOpts
```

- hook up a text input in the view

#### `src/client/routes/dashboard/dashboard.jade`  

```jade
.dashboard
  h2 my people
  input(type='text', ng-model='search.$like')
  p(ng-repeat='person in people.items') {{ person.name }}
  pagination(ng-model='peopleOpts.page', total='people.total', page-size='peopleOpts.pageSize')
```  

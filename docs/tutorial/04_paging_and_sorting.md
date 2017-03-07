### index
- [01 - getting started](https://ndxbxrme.github.io/ndx-framework/docs/tutorial/01_getting_started.html)
- [02 - users](https://ndxbxrme.github.io/ndx-framework/docs/tutorial/02_users.html)
- [03 - rest api](https://ndxbxrme.github.io/ndx-framework/docs/tutorial/03_restapi.html)
- _[04 - pagination and sorting](https://ndxbxrme.github.io/ndx-framework/docs/tutorial/04_paging_and_sorting.html)_
- [05 - search and delete](https://ndxbxrme.github.io/ndx-framework/docs/tutorial/05_search_and_delete)

# pagination and sorting
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

### sorting
- add some sorting properties to the `options` object

#### `src/client/routes/dashboard/dashboard.ctrl.coffee`  

```coffeescript
'use strict'

angular.module 'tutorial'
.controller 'DashboardCtrl', ($scope) ->
  $scope.peopleOpts =
    page: 1
    pageSize: 10
    sort: 'name'
    sortDir: 'ASC'
```   

- now the people are sorted;)
- add some controls to the view

#### `src/client/routes/dashboard/dashboard.jade` 

```diff
.dashboard
  h2 my people
+  input(type='text', ng-model='search.$like')
  select(ng-model='peopleOpts.sort')
    option name
    option emaile
  select(ng-model='peopleOpts.sortDir')
    option ASC
    option DESC
  .person(ng-repeat='person in people.items') 
    .name {{ person.name }}
    .email {{ person.emaile }}
  pagination(ng-model='peopleOpts.page', total='people.total', page-size='peopleOpts.pageSize')
```
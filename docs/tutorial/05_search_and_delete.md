### index
- [01 - getting started](https://ndxbxrme.github.io/ndx-framework/docs/tutorial/01_getting_started.html)
- [02 - users](https://ndxbxrme.github.io/ndx-framework/docs/tutorial/02_users.html)
- [03 - rest api](https://ndxbxrme.github.io/ndx-framework/docs/tutorial/03_restapi.html)
- [04 - pagination and sorting](https://ndxbxrme.github.io/ndx-framework/docs/tutorial/04_paging_and_sorting.html)
- _[05 - search and delete](https://ndxbxrme.github.io/ndx-framework/docs/tutorial/05_search_and_delete)_

# search and delete

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
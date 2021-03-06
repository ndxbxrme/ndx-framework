### index
- [01 - getting started](https://ndxbxrme.github.io/ndx-framework/docs/tutorial/01_getting_started)
- [02 - users](https://ndxbxrme.github.io/ndx-framework/docs/tutorial/02_users)
- [03 - rest api](https://ndxbxrme.github.io/ndx-framework/docs/tutorial/03_restapi)
- [04 - pagination and sorting](https://ndxbxrme.github.io/ndx-framework/docs/tutorial/04_paging_and_sorting)
- _[05 - search and delete](https://ndxbxrme.github.io/ndx-framework/docs/tutorial/05_search_and_delete)_
- [06 - live data](https://ndxbxrme.github.io/ndx-framework/docs/tutorial/06_live_data)
- [07 - items and routes](https://ndxbxrme.github.io/ndx-framework/docs/tutorial/07_items_and_routes)

# search and delete

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
    page: 1
    pageSize: 10
    sort: 'name'
    sortDir: 'ASC'
  $scope.people = $scope.list 'people', $scope.peopleOpts
```

- hook up a text input in the view and add a delete button

#### `src/client/routes/dashboard/dashboard.jade`  

```pug
.dashboard
  h2 my people
  input(type='text', ng-model='search.$like')
  select(ng-model='peopleOpts.sort')
    option name
    option email
  select(ng-model='peopleOpts.sortDir')
    option ASC
    option DESC
  .person(ng-repeat='person in people.items') 
    .name { { person.name }}
    .email { { person.email }}
    a.delete(href='', ng-click='people.delete(person)') Delete
  pagination(ng-model='peopleOpts.page', total='people.total', page-size='peopleOpts.pageSize')
```  

- now you can search and delete

### [next > >](https://ndxbxrme.github.io/ndx-framework/docs/tutorial/06_live_data)
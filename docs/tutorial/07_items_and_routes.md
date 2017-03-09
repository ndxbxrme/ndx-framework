### index
- [01 - getting started](https://ndxbxrme.github.io/ndx-framework/docs/tutorial/01_getting_started)
- [02 - users](https://ndxbxrme.github.io/ndx-framework/docs/tutorial/02_users)
- [03 - rest api](https://ndxbxrme.github.io/ndx-framework/docs/tutorial/03_restapi)
- [04 - pagination and sorting](https://ndxbxrme.github.io/ndx-framework/docs/tutorial/04_paging_and_sorting)
- [05 - search and delete](https://ndxbxrme.github.io/ndx-framework/docs/tutorial/05_search_and_delete)
- [06 - live data](https://ndxbxrme.github.io/ndx-framework/docs/tutorial/06_live_data)
- _[07 - items and routes](https://ndxbxrme.github.io/ndx-framework/docs/tutorial/07_items_and_routes)_

# items and routes

- scaffold a new route called `person`  
when asked, type `true` for roles and `:id` for parameters  

```bash
λ yo ndx:route person
? Where would you like to create this route? /src/client/routes/person
? User roles true
? Parameters (eg. :id/something/:another) :id
```

- convert the person's name into a link in the `dashboard` view  

#### `/src/client/routes/dashboard/dashboard.jade`

```pug
[...]
  .person(ng-repeat='person in people.items') 
    a.name(ui-sref='person({id:person._id})') { { person.name }}
    .email { { person.email }}
    a.delete(href='', ng-click='people.delete(person)') Delete
[...]
```

- open `/src/client/routes/person/person.ctrl.coffee` and grab the person from their id  

#### `/src/client/routes/person/person.ctrl.coffee`  

```coffeescript
'use strict'

angular.module 'tutorial'
.controller 'PersonCtrl', ($scope, $stateParams) ->
  $scope.person = $scope.single 'people', $stateParams.id
```

- add some controls to the view  

#### `/src/client/routes/person/person.jade`

```pug
.person
  input(type='text', ng-model='person.item.name')
  button(ng-click='person.save()') Save
```

- you should now be able to select and update people  

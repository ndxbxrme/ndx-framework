### index
- [01 - getting started](https://ndxbxrme.github.io/ndx-framework/docs/tutorial/01_getting_started)
- _[02 - users](https://ndxbxrme.github.io/ndx-framework/docs/tutorial/02_users)_
- [03 - rest api](https://ndxbxrme.github.io/ndx-framework/docs/tutorial/03_restapi)
- [04 - pagination and sorting](https://ndxbxrme.github.io/ndx-framework/docs/tutorial/04_paging_and_sorting)
- [05 - search and delete](https://ndxbxrme.github.io/ndx-framework/docs/tutorial/05_search_and_delete)
- [06 - live data](https://ndxbxrme.github.io/ndx-framework/docs/tutorial/06_live_data)
- [07 - items and routes](https://ndxbxrme.github.io/ndx-framework/docs/tutorial/07_items_and_routes)

# 02 - users
### login
- stop the app by hitting Ctrl-C twice and cd into the project directory  
`cd tutorial`  
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

- start your app back up by typing `grunt`
- you should now be able to sign up and log in

### [next > >](https://ndxbxrme.github.io/ndx-framework/docs/tutorial/03_restapi)

### index
- [01 - getting started](https://ndxbxrme.github.io/ndx-framework/docs/tutorial/01_getting_started)
- [02 - users](https://ndxbxrme.github.io/ndx-framework/docs/tutorial/02_users)
- [03 - rest api](https://ndxbxrme.github.io/ndx-framework/docs/tutorial/03_restapi)
- [04 - pagination and sorting](https://ndxbxrme.github.io/ndx-framework/docs/tutorial/04_paging_and_sorting)
- [05 - search and delete](https://ndxbxrme.github.io/ndx-framework/docs/tutorial/05_search_and_delete)
- _[06 - live data](https://ndxbxrme.github.io/ndx-framework/docs/tutorial/06_live_data)_

# live data
- install serverside sockets  
`npm install --save ndx-socket`  
- include them in the server `use` list  

#### `src/server/app.coffee`  

```coffeescript
'use strict'

require 'ndx-server'
.config
  database: 'db'
  tables: ['users', 'people']
  localStorage: './data'
.use require './services/startup'
.use 'ndx-passport'
.use 'ndx-rest'
.use 'ndx-socket'
.use 'ndx-static-routes'
.start()
```

- add a script reference to socket.io in `index.jade`  

#### `src/client/index.jade`  
```jade
...
  body(ng-app='tutorial')
    login
    .body(ng-show='auth.getUser()')
      .logout
        a(href='/api/logout', target='_self') Log out
      .view(ui-view='')
    // bower:js 
    // endbower 
    script(src='https://cdn.socket.io/socket.io-1.4.5.js')
    // injector:js 
    // endinjector 
```

- open the app in two browsers and try deleting some people  

# ndx-framework
### making a module
- scaffold the module  
`yo ndx module-name`  
- when asked, choose `Module`  
- npm link it for testing  
```bash
cd module-name
npm link
grunt
```
- in another terminal tab make an ndx-framework app to test your module with and npm link it to your module  
```bash
yo ndx app-name
cd app-name
npm link module-name
grunt
```
- register your module in `src/server/app.coffee`  

```coffeescript
'use strict'

ndx = require 'ndx-server'
.config
  database: 'db'
  tables: ['users']
  localStorage: './data'
.use 'ndx-static-routes'
.controller 'module-name'
.start()
```

- make your module  
- to get module changes to show up in the app add or remove a space from `app-name/src/server/app.coffee` to force grunt to rebuild the app  

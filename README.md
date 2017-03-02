# ndx-framework
### a robust, modular, friendly javascript app framework
- based on trusted technologies ([express](http://expressjs.com/), [angular1](https://angularjs.org/)) with an emphasis on stability, scalability, code clarity and rapid development.  
- ndx-framework uses [coffeescript](http://coffeescript.org/), [pug/jade](https://pugjs.org/api/getting-started.html) and [stylus](http://stylus-lang.com/) to keep your codebase tight and legible
- npm and bower support
- fully platform independent
- promotes modularity
- [ndx-framework modules](#modules) are easy to author, especially if you are already acquainted with [express](http://expressjs.com/) servers
- there are already [many](#available) ndx-framework modules to make common tasks simple, eg user management/user roles/sockets/server syncing
- easy to integrate server profiler
- ssl, tokens, oauth2
- designed to run with a small footprint in constrained environments eg heroku
- built-in lightning fast in-memory sql/nosql/nodb [ndxdb](https://github.com/ndxbxrme/ndxdb) that treats javascript objects as first-class citizens and can persist data to s3 in a cost effective/performant manner 
- any other database can easily be plugged in, see [ndx-database-engine](https://github.com/ndxbxrme/ndx-database-engine)

## getting started
ndx-framework requires node and npm so make sure you have them installed by typing `node -v` and `npm -v`
* install and initialize ndx-framework
```bash
    npm install -g ndx-framework
    ndx-framework --init
```
* create an app
```bash
    ndx-framework --create appName
```
* navigate to`http://localhost:2323`

### grunt
ndx-framework uses [grunt](https://gruntjs.com/) to run and livereload your app while in development  
from within the app folder you can start your app by typing
```bash
    grunt
```
to build your app for production
```bash
    grunt build
```
when adding files to your project you might need to stop and restart grunt

### yeoman
ndx-framework uses [yeoman]() to generate/scaffold apps  
from within the app folder you can run [generator-ndx](https://github.com/ndxbxrme/generator-ndx) generators to build out your app

### environment variables
we encourage the use of environment variables to store sensitive settings (AWS key etc)  
other settings can be passed into the ndx-server `.config()` function in `src/server/app.coffee`

#### commonly used environment variables

#### [`ndx-server`](https://github.com/ndxbxrme/ndx-server)

| environment | config   | required  | description                          |
|-------------|----------|-----------|--------------------------------------|
|PORT         |port      |Yes        |the port your app will run on         |
|SSL_PORT     |sslPort   |No         |https port, see [ssl](#ssl)               |
|SESSION_SECRET|sessionSecret|No|used for encryption, it's good practise to set this one|
|SKIP_IP_ENCRYPT|skipIpEncrypt|No|by default tokens are IP encrypted, some servers don't like this - set it to `false` to skip this stage|
|AUTO_ID|autoId|No|the id column name, defaults to `_id`|
|USER_TABLE|userTable|No|database table name to store user data, defaults to `users`|
| - |dbEngine|No|[database engine](https://github.com/ndxbxrme/ndx-database-engine) to use, defaults to `require('ndxdb')`|
| - |publicUser|No|an object describing which user fields get sent to the client, eg `{_id:true,local:{email:true},roles:true}`|

#### [`ndxdb`](https://github.com/ndxbxrme/ndxdb)

|Environment|Config|Required|Description|
|-----------|------|--------|-----------|
|-|tables|Yes|an array of database table names eg `['users','houses','friends']`
|LOCAL_STORAGE|localStorage|No|local folder for data storage, eg `data` or `../data`|
|AWS_BUCKET|awsBucket|No|AWS bucket name for S3 data persistence|
|AWS_REGION|awsRegion|No|defaults to `us-east-1`|
|AWS_ID|awsId|No|your aws id|
|AWS_KEY|awsKey|No|your aws key|
other modules may require their own environment variables, check that module's homepage to see what you need to set
### ssl
<a name="ssl"></a>
set the `SSL_PORT=[portNo]` environment variable and drop `key.pem` and `cert.pem` into the app directory
### modules
<a name="modules"></a>
ndx-framework is built around modularity.  
server modules are simply a function that receives the `ndx` object and adds functionality to it
`src/server/app.coffee`
```coffeescript
require 'ndx-server'
.config
  database: 'db'
.controller (ndx) ->
  ndx.app.get '/', (req, res, next) ->
    res.end 'hi from ndx!'
.start()
```
as your app grows you'll find it easier to keep the code for your modules seperate
`src/server/app.coffee`
```coffeescript
require 'ndx-server'
.config
  database: 'db'
.controller require './controllers/first'
.start()
```
`src/server/controllers/first.coffee`
```coffeescript
module.exports (ndx) ->
  ndx.app.get '/', (req, res, next) ->
    res.end 'hi from ndx!'
```
you can also publish your modules to npm  
modules installed this way don't neeed requiring 
`src/server/app.coffee`
```coffeescript
require 'ndx-server'
.config
  database: 'db'
.controller 'ndx-static-routes'
.start()
```
### api routes and users
all routes that start with `api/` get the currently logged in user as `req.user`, eg
`src/server/app.coffee`
```coffeescript
require 'ndx-server'
.config
  database: 'db'
.use 'ndx-passport'
.controller (ndx) ->
  ndx.app.get 'api/test', (req, res, next) ->
    if req.user
      res.end "Hi #{req.user.local.email}"
    else
      next 'not logged in'
.start()
```
### authenticating api routes
without roles
`src/server/app.coffee`
```coffeescript
require 'ndx-server'
.config
  database: 'db'
.use 'ndx-passport'
.controller (ndx) ->
  ndx.app.get 'api/protected', ndx.authenticate(), (req, res, next) ->
    res.end 'you\'re cool'
.start()
```
with roles, using [ndx-user-roles](https://github.com/ndxbxrme/ndx-user-roles)
`src/server/app.coffee`
```coffeescript
require 'ndx-server'
.config
  database: 'db'
.use 'ndx-passport'
.use 'ndx-user-roles'
.controller (ndx) ->
  ndx.app.get 'api/protected', ndx.authenticate(['admin', 'superadmin']), (req, res, next) ->
    res.end 'you\'re cool'
.start()
```
### currently available modules
<a name="available"></a>
server modules - install with `npm install --save module-name`

|name|description|
|----|-----------|
|[ndx-auth](https://github.com/ndxbxrme/ndx-auth)| oauth2 authentication routes |
|[ndx-connect](https://github.com/ndxbxrme/ndx-connect)| lets authenticated users connect to the database to perform arbitrary operations |
|[ndx-cors](https://github.com/ndxbxrme/ndx-cors)| adds cors support to `api/` routes |
|[ndx-database-backup](https://github.com/ndxbxrme/ndx-database-backup)| schedule regular database backups |
|[ndx-framework](https://github.com/ndxbxrme/ndx-framework)| this package |
|[ndx-keep-awake](https://github.com/ndxbxrme/ndx-keep-awake)| creates and regularly calls an `api/` route, this is useful to stop your app going to sleep on hosts where that is a thing (heroku) |
|[ndx-memory-check](https://github.com/ndxbxrme/ndx-memory-check)| adds an admin authenticated route to check the current memory usage |
|[ndx-passport](https://github.com/ndxbxrme/ndx-passport)| provides basic login functions and local user login |
|[ndx-passport-facebook](https://github.com/ndxbxrme/ndx-passport-facebook)| facebook oauth login |
|[ndx-passport-twitter](https://github.com/ndxbxrme/ndx-passport-twitter)| twitter oauth login |
|[ndx-passport-github](https://github.com/ndxbxrme/ndx-passport-github)| github oauth login |
|[ndx-profiler](https://github.com/ndxbxrme/ndx-profiler)| collects server stats which can then be collected with [ndx-appmonitor](https://github.com/ndxbxrme/ndx-appmonitor) |
|[ndx-publish](https://github.com/ndxbxrme/ndx-publish)| publishes database collections for the client to subscribe to |
|[ndx-server](https://github.com/ndxbxrme/ndx-server)| the server |
|[ndx-socket](https://github.com/ndxbxrme/ndx-socket)| adds websockets |
|[ndx-static-routes](https://github.com/ndxbxrme/ndx-static-routes)| static routes to serve up the angular app `src/client` and the `public/` folder |
|[ndx-superadmin](https://github.com/ndxbxrme/ndx-superadmin)| creates a default superadmin user then nags you to change her password |
|[ndx-sync](https://github.com/ndxbxrme/ndx-sync)| synchronizes two or more instances of an ndx-framework app using websockets - provides horizontal scaling when using in-memory (and other) databases  |
|[ndx-user-roles](https://github.com/ndxbxrme/ndx-user-roles)| authenticate `api/` routes using roles |
client modules - install with `bower install --save module-name`
|name|description|
|----|-----------|
|ndx-auth|clientside role based authentication, for use in conjunction with [ndx-user-roles](https://github.com/ndxbxrme/ndx-user-roles)|
if you make any cool modules let us know and we'll add them to the list

### connect to the app
add these modules to 
`src/server/app.coffee`
```coffeescript
require 'ndx-server'
.config
  database: 'db'
.use 'ndx-cors'
.use 'ndx-user-roles'
.use 'ndx-auth'
.use 'ndx-superadmin'
.use 'ndx-connect'
.start()
```
then type `ndx-framework` to open the interactive app connector
```bash
> ndx-framework
ndx framework v0.0.1
type help for a list of commands
hit Ctrl-C to exit
ndx> login
host> localhost:3000
username> superadmin@admin.com
password>
successfully connected to http://localhost:3000
ndx> backup list
Sun Jan 29 2017 12:10:02 AM
Sun Jan 29 2017 12:12:03 AM
Sun Jan 29 2017 08:38:00 AM
Sun Jan 29 2017 10:38:00 AM
Sun Jan 29 2017 12:38:00 PM
Sun Jan 29 2017 02:38:00 PM
```
### app monitor
you can use [ndx-appmonitor](https://github.com/ndxbxrme/ndx-appmonitor) to monitor the status of your app in realtime
`src/server/app.coffee`
```coffeescript
require 'ndx-server'
.config
  database: 'db'
.use 'ndx-cors'
.use 'ndx-profiler'
.use 'ndx-user-roles'
.use 'ndx-auth'
.use 'ndx-superadmin'
.start()
```
to monitor local apps git clone [ndx-appmonitor](https://github.com/ndxbxrme/ndx-appmonitor) then run it with grunt  
for live apps you can use [this pen](http://codepen.io/ndxbxrme/full/evNyGV/)

### running your app in production
build your app with 
`grunt build`
remember to set `NODE_ENV=production`
then run the app using
`node --expose-gc server/app.js`
the `--expose-gc` flag is optional - if you include it ndx-server will do some extra garbage collection which can help keep memory use down (especially useful if you are working with third party packages that might be a bit leaky)
### the difference between .use() and .controller()
the only real difference is a matter of timing, both are called on app start and both receive a reference to the `ndx` object
`.use` modules get loaded before `.controller` modules  
we recommend that you use `.use` modules for services and long running operations which will usually add themselves to the `ndx` object for other modules to use down the line  
`.controller` modules are for api routes etc
### error handling
to handle an error within an api route simply call `next()` with an error message or an object containing a status code and error message
```coffeescript
module.exports = (ndx) ->
  ndx.app.get 'api/error', (req, res, next) ->
    if req.user
      if req.user.local.email is 'a@a.com'
        res.end 'you\'re cool'
      else
        next 'i don\'t like you'
    else
      next
        status: 401
        message: 'not authorized'
```
### anatomy of an ndx-framework web app
| route         | description|
|---------------|------------|
| `src/client/`| the angular app|
| `src/client/directives/`| a place to keep angular directives|
| `src/client/filters/`| angular filters |
| `src/client/routes/`| put your routes in here |
| `src/client/services/`| angular services |
| `src/client/app.coffee`| the main angular module |
| `src/client/app.stylus`| global styles, local stylus files should be kept in the relevant directive/route folder |
| `src/client/index.jade`| the page that runs your site, includes dependency injection to automatically include all your scripts and css |
| `src/client/variables.styl`| a place to put your stylus variables |
| `src/server/`| the web server |
| `src/server/controllers/`| keep your app controllers in here |
| `src/server/services/`| app services |
| `src/server/app.coffee`| the main app file - configures and starts ndx-server, register your modules/controllers/services in this file |
| `public/`| statically served resources, put your images/fonts/favicons in here, eg `img(src='public/images/logo.png')` |
### generated folders 
You should generally avoid messing with these folders 

| route     | description |
|-----------|-------------|
| `bower/`| bower components |
| `build/`| the clientside app, served only in dev mode `NODE_ENV=dev` |
| `dist/`| the built clientside app, served in production mode `NODE_ENV=production` |
| `node_modules/`| node modules |
| `server/`| the built web server|
### coming soon
    - clientside database
    - clientside subscriptions to database events
    - more generators
    - build for mobile
    - better documentation
    - docker/kubernetes documentation
    - testing (e2e/system) documentation

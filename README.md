- create chirp
- get all chirps
- delete chirp
- update chirp 
- get chirp

collection url: /api/chirps
item url: /api/chirps/:id

you will need to generate random ids for the chirps
(hint you can use a module called shortid, you can also make it a middleware function. but if you do, don't forget to call next())

index.js
data.json
package.json

//sample package.json
{
  "name": "node-express-example",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "body-parser": "^1.18.2",
    "express": "latest"
  }
}

app
    .disable('x-powered-by')
    .use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, POST, UPDATE, DELETE");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
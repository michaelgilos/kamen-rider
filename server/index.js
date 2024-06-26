const jsonServer = require('json-server');
const server = jsonServer.create();
// const router = jsonServer.router('db.json');
const path = require('path');
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  // Continue to JSON Server router
  setTimeout(next, 100 + Math.floor(Math.random() * 3000)); //introduce delay
});

// Use default router
server.use(router);
server.listen(1337, () => {
  console.log('JSON Server is running on port 1337');
});

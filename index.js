const restify = require('restify');

const errs = require('restify-errors');

var Item = require('models').Item;

const server = restify.createServer({
  name: 'minha aplicacao',
  version: '1.0.0'
});

const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : 'pass',
      database : 'dbnode'
    }
  });

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.listen(8082, function () {
  console.log('%s Ouvindo porta %s', server.name, server.url);
});

// Rotas
// Rota inicial de teste.
server.get('/', (requisition, response, next) => {  
    response.send('Servidor online');
});

// rota de busca de usuarios
server.get('/user', (requisition, response, next) => {  
    knex('tbluser').then((data) => {
        response.send(data);
    }, next)
});

// rota para insercao
server.post('/user/inserir', (requisition, response, next) => {  
    knex('tbluser')
    .insert(requisition.body)
    .then((data) => {
        response.send(data);
    }, next)
});

app.use(function(req, res, next) {
    if (req.params.itemId) {
      Item.findById(req.params.itemId, function(err, item) {
        req.item = item;
        next();
      });
    }
    else {
      next();
    }
  });
  
  server.get('/api/items/:itemId', function(req, res, next) {
    res.send(200, req.item);
  });
  
  server.put('/api/items/:itemId', function(req, res, next) {
    req.item.set(req.body);
    req.item.save(function(err, item) {
      res.send(204, item);
    });
  });
  
  server.post('/api/items', function(req, res, next) {
    var item = new Item(req.body);
    item.save(function(err, item) {
      res.send(201, item);
    });
  });
  
  server.delete('/api/items/:itemId', function(req, res, next) {
    req.item.remove(function(err) {
      res.send(204, {});
    });
  });

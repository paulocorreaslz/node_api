const restify = require('restify');

const errs = require('restify-errors');

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

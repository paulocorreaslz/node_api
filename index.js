const restify = require('restify');

const errs = require('restify-errors');

const server = restify.createServer({
  name: 'minha aplicacao',
  version: '1.0.0'
});
export default function() {

  this.passthrough('/write-coverage');

  this.urlPrefix = 'http://localhost:3000';

  // this.namespace = '';
  // this.timing = 400;

  this.get('/namespaces');
  this.get('/namespaces/:id', (schema, request) => {
    let namespace = schema.namespaces.find(request.params.id);

    return namespace.repositories;
  });

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.2.x/shorthands/
  */
}

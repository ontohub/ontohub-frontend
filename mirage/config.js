export default function() {

  this.urlPrefix = 'http://localhost:3000';
  // this.namespace = '';
  // this.timing = 400;

  this.get('/namespaces');
  this.get('/namespaces/:id', function(schema, request) {
    let namespace = schema.namespaces.find(request.params.id);

    return namespace.repositories;
  });

  this.get('/repositories');
  this.get('/repositories/:id');
  this.post('/repositories', function(schema) {
    let attrs = this.normalizedRequestAttrs();
    attrs['slug'] = attrs.name.split(' ').join('-');
    attrs['id'] = attrs.slug;

    return schema.repositories.create(attrs);
  });
  this.del('/repositories/:id');

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

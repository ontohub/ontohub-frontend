export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  this.urlPrefix = 'http://localhost:3000';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  this.get('/namespaces');
  this.get('/namespaces/:id', function(schema, request) {
    let namespace = schema.namespaces.find(request.params.id);

    return namespace.repositories;
  });

  this.get('/repositories');
  this.get('/repositories/:id');
  this.post('/repositories', function(schema, request) {
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

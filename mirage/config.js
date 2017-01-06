export default function() {

  this.passthrough('/write-coverage');

  this.urlPrefix = 'http://localhost:3000';

  // this.namespace = '';
  // this.timing = 400;

  this.get('/namespaces/:id', (schema, request) => {
    let namespace = schema.namespaces.find(request.params.id);
    return namespace;
  });

  this.get('/repositories');
  this.get('/repositories/:namespace_id/:id');
  this.post('/repositories', (schema) => {
    let attrs = this.normalizedRequestAttrs();
    let slug = attrs.name.split(' ').join('-');
    attrs['id'] = slug;

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

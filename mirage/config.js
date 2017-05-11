import _ from 'lodash'

export default function() {
  this.passthrough('/write-coverage')

  this.urlPrefix = 'http://localhost:3000'

  // this.namespace = '';
  // this.timing = 400;

  this.get('/organizational_units/:id', (schema, request) => {
    let user = schema.users.find(request.params.id),
        organization = schema.organizations.find(request.params.id)

    return organization || user
  })

  this.get('/version', () => ({
    data: {
      attributes: {
        commit: '21e9779',
        commits_since_tag: 65,
        full: '0.0.0-65-g21e9779',
        tag: '0.0.0'
      },
      id: 'version',
      type: 'versions'
    }
  }))

  this.get('/search', function(schema) {
    let users = this.serialize(schema.users.all()).data,
        organizations = this.serialize(schema.organizations.all()).data,
        repositories = this.serialize(schema.repositories.all()).data,
        attributes = {
          id: 'search_result',
          repositoriesCount: repositories.length,
          organizationalUnitsCount: users.length + organizations.length,
          // eslint-disable-next-line max-len
          resultsCount: repositories.length + users.length + organizations.length,
          organizationIds: _.map(organizations, (o) => o.id),
          userIds: _.map(users, (o) => o.id),
          repositoryIds: _.map(repositories, (o) => o.id)
        },
        result = this.serialize(schema.searchResults.new(attributes)),
        relOrganizations = result.data.relationships.organizations,
        relUsers = result.data.relationships.users
    result.data.relationships.organizational_units = {
      data: _.concat(relUsers.data, relOrganizations.data)
    }
    delete result.data.relationships.users
    delete result.data.relationships.organizations
    return result
  })

  this.post('/users')
  this.post('/users/sign_in', () => ({
    data: {
      attributes: {
        // eslint-disable-next-line max-len
        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJ1c2VyX2lkIjoiYWRhIiwiZXhwIjoxNDkyNjAwOTkxfQ.fepsfgUuzVhCYRoqD25AjnoD1Hj96WvF1B35-w2jEt7iONi-k7mk-YXhSaXOUiVMQGLT4Xl22Dlekf-STxLz3A'
      },
      id: 'authenticationtoken',
      type: 'authentication_tokens'
    },
    jsonapi: {
      version: '1.0'
    }
  }))
  this.get('/users/:id')
  this.del('/users/:id')
  this.put('/users/:id')

  this.post('/organizations')
  this.get('/organizations/:id')
  this.del('/organizations/:id')
  this.put('/organizations/:id')

  this.post('/repositories', function(schema, request) {
    let originalRequest = JSON.parse(request.requestBody),
        owner = originalRequest.data.relationships.owner.data,
        attrs = this.normalizedRequestAttrs(),
        slug = attrs.name.split(' ').join('-')

    attrs.id = `${owner.id}/${slug}`

    if (owner.type === 'users') {
      attrs.ownerUserId = owner.id
    } else if (owner.type === 'organizations') {
      attrs.ownerOrganizationId = owner.id
    }
    delete attrs.ownerId

    return schema.repositories.create(attrs)
  })
  this.get('/repositories/:orgUnit/:id', (schema, request) => {
    let repoId = [request.params.orgUnit, request.params.id].join('/'),
        repository = schema.repositories.find(repoId)

    return repository
  })
  this.del('/repositories/:orgUnit/:id', (schema, request) => {
    let repoId = [request.params.orgUnit, request.params.id].join('/')
    schema.repositories.find(repoId).destroy()
  })
  this.patch('/repositories/:orgUnit/:id', function(schema, request) {
    let repoId = [request.params.orgUnit, request.params.id].join('/'),
        repo = schema.repositories.find(repoId),
        attrs = this.normalizedRequestAttrs()

    if (repo.ownerUserId) {
      attrs.ownerUserId = repo.ownerUserId
    } else if (repo.ownerOrganizationId) {
      attrs.ownerOrganizationId = repo.ownerUserId
    }

    delete attrs.ownerId
    attrs.id = repo.id

    return repo.update(attrs)
  })

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

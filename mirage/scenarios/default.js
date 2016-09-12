import _ from 'lodash';

export default function(server) {

  let namespaces = server.createList('namespace', 5);
  _.map(namespaces, (ns) => server.createList('repository', 5, { namespace: ns }));

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.

    Make sure to define a factory for each model you want to create.
  */

  // server.createList('post', 10);
}

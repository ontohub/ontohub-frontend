export default function(server) {

  let namespace = server.create('namespace');
  server.createList('repository', 10, { namespace });

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.

    Make sure to define a factory for each model you want to create.
  */

  // server.createList('post', 10);
}

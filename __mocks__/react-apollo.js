const ReactApollo = require.requireActual("react-apollo");

const responses = new Map();
const getResponse = query => responses.get(query);
const mockResponse = (query, response) => responses.set(query, response);
const clearResponses = () => responses.clear();

const client = {
  resetStore: jest.fn()
};

const ApolloConsumer = function({ children }) {
  return children(client);
};

const Query = function({ children, query }) {
  const Child = children;

  const { data = undefined, loading = false, error = false } =
    getResponse(query) || {};

  const ret = <Child loading={loading} error={error} data={data} />;
  return ret;
};

const Mutation = function({ children, mutation }) {
  const response = getResponse(mutation) || {};
  const { data = undefined, loading = false, called = false } = response;

  return children(() => {
    response.called = true;
    mockResponse(mutation, response);
    return Promise.resolve(response);
  }, response);
};

module.exports = {
  ...ReactApollo,
  Query,
  Mutation,
  ApolloConsumer,
  __mocks__: {
    getResponse,
    clearResponses,
    mockResponse,
    client
  }
};

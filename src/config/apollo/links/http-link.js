import { BatchHttpLink } from "apollo-link-batch-http";

const backendHost = process.env.REACT_APP_BACKEND_HOST;

export default new BatchHttpLink({
  uri: `${backendHost}/graphql`
});

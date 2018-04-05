import { ApolloLink } from "apollo-link";
import HTTPLink from "./http-link";
import HeaderLink from "./header-link";

export default ApolloLink.from([HeaderLink, HTTPLink]);

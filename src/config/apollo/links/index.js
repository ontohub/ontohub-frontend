import { ApolloLink } from "apollo-link";
import { link as httpLink } from "./http-link";
import { link as headerLink } from "./header-link";

export const link = ApolloLink.from([headerLink, httpLink]);

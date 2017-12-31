import { graphql } from "react-apollo";
import { organizationalUnitQuery } from "./apollo/queries";

import {
  Home,
  HomeHeader,
  OrganizationalUnit,
  OrganizationalUnitHeader,
  Repository,
  RepositoryHeader
} from "./scenes";

export default [
  {
    path: "/",
    exact: true,
    header: HomeHeader,
    main: Home
  },
  {
    path:
      "/:organizationalUnitId/(repositories|organizations|members|settings)?",
    header: OrganizationalUnitHeader,
    main: OrganizationalUnit,
    graphql: graphql(organizationalUnitQuery, {
      options: ({ match: { params: { organizationalUnitId } } }) => ({
        variables: { id: organizationalUnitId }
      })
    })
  },
  {
    path: "/:organizationalUnitId/:repositoryId",
    exact: true,
    header: RepositoryHeader,
    main: Repository
  }
];

import { graphql } from "react-apollo";
import { organizationalUnitQuery, repositoryQuery } from "./apollo/queries";
import { organizationalUnitQuery, repositoryQuery } from "config/apollo/queries";

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
    header: Home.Header,
    main: Home.Body
  },
  {
    path: "/:organizationalUnitId",
    exact: true,
    header: OrganizationalUnitHeader,
    main: OrganizationalUnit,
    graphql: graphql(organizationalUnitQuery, {
      options: ({ match: { params: { organizationalUnitId } } }) => ({
        variables: { id: organizationalUnitId }
      })
    })
  },
  {
    path:
      "/:organizationalUnitId/(repositories|organizations|members|settings)?",
    header: OrganizationalUnit.Header,
    main: OrganizationalUnit.Body,
    graphql: graphql(organizationalUnitQuery, {
      options: ({ match: { params: { organizationalUnitId } } }) => ({
        variables: { id: organizationalUnitId }
      })
    })
  },
  {
    path: "/:organizationalUnitId/:repositoryId/rev/:revision",
    header: RepositoryHeader,
    main: Repository,
    graphql: graphql(repositoryQuery, {
      options: ({
        match: { params: { organizationalUnitId, repositoryId, revision } }
      }) => ({
        variables: {
          id: `${organizationalUnitId}/${repositoryId}`,
          revision: decodeURIComponent(revision)
        }
      })
    })
  },
  {
    path: "/:organizationalUnitId/:repositoryId",
    header: RepositoryHeader,
    main: Repository,
    graphql: graphql(repositoryQuery, {
      options: ({
        match: { params: { organizationalUnitId, repositoryId } }
      }) => ({
        variables: {
          id: `${organizationalUnitId}/${repositoryId}`
        }
      })
    })
  }
];

import { graphql } from "react-apollo";
import {
  organizationalUnitQuery,
  repositoryQuery
} from "config/apollo/queries";

import Home from "scenes/home";
import OrganizationalUnit from "scenes/organizational-unit";
import Repository from "scenes/repository";

export const routes = [
  {
    path: "/",
    exact: true,
    header: Home.Header,
    main: Home.Body
  },
  {
    path: "/:organizationalUnitId",
    exact: true,
    header: OrganizationalUnit.Header,
    main: OrganizationalUnit.Body,
    graphql: graphql(organizationalUnitQuery, {
      options: ({
        match: {
          params: { organizationalUnitId }
        }
      }) => ({
        variables: { id: organizationalUnitId }
      })
    })
  },
  {
    path:
      "/:organizationalUnitId/(repositories|organizations|members|settings)",
    header: OrganizationalUnit.Header,
    main: OrganizationalUnit.Body,
    graphql: graphql(organizationalUnitQuery, {
      options: ({
        match: {
          params: { organizationalUnitId }
        }
      }) => ({
        variables: { id: organizationalUnitId }
      })
    })
  },
  {
    path: "/:organizationalUnitId/:repositoryId/rev/:revision",
    header: Repository.Header,
    main: Repository.Body,
    graphql: graphql(repositoryQuery, {
      options: ({
        match: {
          params: { organizationalUnitId, repositoryId, revision }
        }
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
    header: Repository.Header,
    main: Repository.Body,
    graphql: graphql(repositoryQuery, {
      options: ({
        match: {
          params: { organizationalUnitId, repositoryId }
        }
      }) => ({
        variables: {
          id: `${organizationalUnitId}/${repositoryId}`
        }
      })
    })
  }
];

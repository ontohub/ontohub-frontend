import { graphql } from 'react-apollo'
import { organizationalUnitQuery } from './apollo/queries'

import {
  Home,
  HomeHeader,
  OrganizationalUnit,
  OrganizationalUnitHeader
} from "./scenes";

export default [
  {
    path: "/",
    exact: true,
    header: HomeHeader,
    main: Home
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
  }
];

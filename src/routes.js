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
    main: OrganizationalUnit
  }
];

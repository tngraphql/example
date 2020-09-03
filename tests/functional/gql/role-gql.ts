const { gql } = require('apollo-server');

export const ROLE_QUERY = gql(`
query role($filter: RoleFilter, $sortBy: [RoleSort]) {
  role(filter: $filter, sortBy: $sortBy) {
    id
    name
    displayName
    description
    isDefault
    createdAt
    updatedAt
  }
}
`);

export const ROLE_PERMISSION_QUERY = gql(`
query role($filter: RoleFilter, $sortBy: [RoleSort]) {
  role(filter: $filter, sortBy: $sortBy) {
    name
    permissions {
      id
      name
      displayName
      description
      createdAt
      updatedAt
    }
  }
}
`);

export const ROLE_LIST_QUERY = gql(`
query roles(
  $page: Int
  $limit: Int = 20
  $filter: RoleFilter
  $sortBy: [RoleSort]
) {
  roles(page: $page, limit: $limit, filter: $filter, sortBy: $sortBy) {
    from
    to
    perPage
    currentPage
    total
    data {
      id
      name
      displayName
      description
      isDefault
      permissions {
        id
        name
        displayName
        description
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
}
`)
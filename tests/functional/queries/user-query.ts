/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/4/2020
 * Time: 5:04 PM
 */
const { gql } = require('apollo-server');

export const PROFILE_QUERY = gql`
query profile {
  profile {
    id
    phone
    name
    avatar
    dob
    email
    gender
    createdAt
    updatedAt
    deletedAt
  }
}
`;

export const USER_QUERY = gql`
query user($filter: UserFilter, $sortBy: [UserSort]) {
  user(filter: $filter, sortBy: $sortBy) {
    id
    phone
    name
    avatar
    dob
    email
    gender
    createdAt
    updatedAt
    deletedAt
  }
}
`;

export const USER_ROLES_QUERY = gql`
query user($filter: UserFilter, $sortBy: [UserSort]) {
  user(filter: $filter, sortBy: $sortBy) {
    roles {
      id
      name
      displayName
      description
      createdAt
      updatedAt
    }
  }
}
`

export const USER_ROLES_PERMISSION_QUERY = gql`
query user($filter: UserFilter, $sortBy: [UserSort]) {
  user(filter: $filter, sortBy: $sortBy) {
    roles {
      id
      name
      permissions {
        name
      }
    }
  }
}
`

export const USER_LIST_QUERY = gql`
query users(
  $page: Int
  $limit: Int = 20
  $filter: UserFilter
  $sortBy: [UserSort]
) {
  users(page: $page, limit: $limit, filter: $filter, sortBy: $sortBy) {
    from
    to
    perPage
    currentPage
    total
    data {
      id
      phone
      name
      avatar
      dob
      email
      gender
      createdAt
      updatedAt
      deletedAt
    }
  }
}
`
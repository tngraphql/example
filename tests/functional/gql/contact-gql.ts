/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/11/2020
 * Time: 6:12 PM
 */

const { gql } = require('apollo-server');

export const CONTACT_LIST_QUERY = gql`
query contacts(
  $page: Int
  $limit: Int = 20
  $filter: ContactFilter
  $sortBy: [ContactSort]
) {
  contacts(page: $page, limit: $limit, filter: $filter, sortBy: $sortBy) {
    from
    to
    perPage
    currentPage
    total
    data {
      id
      name
        email
        phone
        address
        content
        subject
        status
        createdAt
        updatedAt
      createdAt
      updatedAt
    }
  }
}
`;

export const CONTACT_QUERY = gql`
query contact($filter: ContactFilter, $sortBy: [ContactSort]) {
  contact(filter: $filter, sortBy: $sortBy) {
    id
    name
    name
    email
    phone
    address
    content
    subject
    status
    createdAt
    updatedAt
    createdAt
    updatedAt
  }
}
`;
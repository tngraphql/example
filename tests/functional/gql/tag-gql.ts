/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/11/2020
 * Time: 5:14 PM
 */

const {gql} = require('apollo-server');

export const TAG_LIST_QUERY = gql`
query tags(
  $page: Int
  $limit: Int = 20
  $filter: TagFilter
  $sortBy: [TagSort]
) {
  tags(page: $page, limit: $limit, filter: $filter, sortBy: $sortBy) {
    from
    to
    perPage
    currentPage
    total
    data {
      id
      name
      slug
      createdAt
      updatedAt
    }
  }
}
`;


export const TAG_QUERY = gql`
query contact($filter: TagFilter, $sortBy: [TagSort]) {
  tag(filter: $filter, sortBy: $sortBy) {
    id
    name
    slug
    createdAt
    updatedAt
  }
}`;
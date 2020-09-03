/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/12/2020
 * Time: 8:32 PM
 */
const { gql } = require('apollo-server');

export const CONTACTREPLY_LIST_QUERY = gql`
query contactReplies(
  $page: Int
  $limit: Int = 20
  $filter: ContactReplyFilter
  $sortBy: [ContactReplySort]
) {
  contactReplies(page: $page, limit: $limit, filter: $filter, sortBy: $sortBy) {
    from
    to
    perPage
    currentPage
    total
    data {
      id
      message
      contactId
      createdAt
      updatedAt
    }
  }
}
`;

export const CONTACTREPLY_QUERY = gql`
query contactReply($filter: ContactReplyFilter, $sortBy: [ContactReplySort]) {
  contactReply(filter: $filter, sortBy: $sortBy) {
    id
    message
    contactId
    createdAt
    updatedAt
  }
}
`;
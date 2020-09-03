/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/11/2020
 * Time: 5:14 PM
 */

const { gql } = require('apollo-server');

export const COMMENT_LIST_QUERY = gql`
query comments(
  $page: Int
  $limit: Int = 20
  $filter: CommentFilter
  $sortBy: [CommentSort]
) {
  comments(page: $page, limit: $limit, filter: $filter, sortBy: $sortBy) {
    from
    to
    perPage
    currentPage
    total
    data {
      id
      body
      status
      parentId
      totalReply
      commentableType
      commentableId
      responseTo {
        id
        name
        slug
      }
      authorId
      author {
        name
      }
      publishedAt
      createdAt
      updatedAt
      deletedAt
    }
  }
}
`;


export const COMMENT_QUERY = gql`
query comment($filter: CommentFilter, $sortBy: [CommentSort]) {
  comment(filter: $filter, sortBy: $sortBy) {
    id
    body
    status
    parentId
    totalReply
    commentableType
    commentableId
    responseTo {
      id
      name
      slug
    }
    authorId
    author {
      id
      name
    }
    publishedAt
    createdAt
    updatedAt
    deletedAt
  }
}
`;

export const COMMENT_POST_CREATE_GQL = gql`
mutation commentPostCreate(
  $postId: ID_CRYPTO
  $parentId: ID_CRYPTO
  $body: String
) {
  commentPostCreate(postId: $postId, parentId: $parentId, body: $body) {
    id
    body
    status
    parentId
    totalReply
    commentableType
    commentableId
    responseTo {
      id
      name
      slug
    }
    authorId
    author {
      name
    }
    publishedAt
    createdAt
    updatedAt
    deletedAt
  }
}
`;
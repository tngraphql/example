/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/11/2020
 * Time: 5:14 PM
 */

const { gql } = require('apollo-server');

export const PAGE_LIST_QUERY = gql`
query pages(
  $page: Int
  $limit: Int = 20
  $filter: PageFilter
  $sortBy: [PageSort]
) {
  pages(page: $page, limit: $limit, filter: $filter, sortBy: $sortBy) {
    from
    to
    perPage
    currentPage
    total
    data {
      id
      name
      authorId
      parentId
      avatar
      thumbnailId
      slug
      description
      content
      author {
        id
        name
      }
      commentCount
      subCount
      commentStatus
      postStatus
      seoTitle
      seoDescription
      seoKeyword
      meta {
        metaKey
        metaValue
      }
      language
      languageMaster
      otherLanguages {
        language
      }
      publishedAt
      createdAt
      updatedAt
    }
  }
}
`;


export const PAGE_QUERY = gql`
query page($filter: PageFilter, $sortBy: [PageSort]) {
  page(filter: $filter, sortBy: $sortBy) {
    id
    name
    authorId
    parentId
    avatar
    thumbnailId
    slug
    description
    content
    author {
      id
      name
    }
    commentCount
    subCount
    commentStatus
    postStatus
    seoTitle
    seoDescription
    seoKeyword
    meta {
      metaKey
      metaValue
    }
    language
    languageMaster
    otherLanguages {
      language
    }
    publishedAt
    createdAt
    updatedAt
  }
}
`;
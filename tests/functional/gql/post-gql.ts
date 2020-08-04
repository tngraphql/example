/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/11/2020
 * Time: 5:14 PM
 */

const {gql} = require('apollo-server');

export const POST_LIST_QUERY = gql`
query posts(
  $page: Int
  $limit: Int = 20
  $filter: PostFilter
  $sortBy: [PostSort]
) {
  posts(page: $page, limit: $limit, filter: $filter, sortBy: $sortBy) {
    from
    to
    perPage
    currentPage
    total
    data {
      id
      format
      name
      isFeatured
      views
      authorId
      parentId
      avatar
      thumbnailId
      slug
      description
      content
      categories {
        id
        name
      }
      tags {
        id
        name
      }
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


export const POST_QUERY = gql`
query post($filter: PostFilter, $sortBy: [PostSort]) {
  post(filter: $filter, sortBy: $sortBy) {
    id
    format
    name
    isFeatured
    views
    authorId
    parentId
    avatar
    thumbnailId
    slug
    description
    content
    categories {
      id
      name
    }
    tags {
      id
      name
    }
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
/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/13/2020
 * Time: 9:38 PM
 */

const {gql} = require('apollo-server');

export const CATEGORY_LIST_QUERY = gql`
query categories(
  $page: Int = 1
  $filter: CategoryFilter
  $sortBy: [CategorySort]
) {
  categories(page: $page, filter: $filter, sortBy: $sortBy) {
    from
    to
    perPage
    currentPage
    total
    data {
      id
      name
      description
      parentId
      slug
      categoryOrder
      language
      languageMaster
      otherLanguages {
        id
        language
        languageMaster
      }
      meta {
        id
        metaKey
        metaValue
      }
      seoTitle
      seoKeyword
      seoDescription
      createdAt
      updatedAt
    }
  }
}
`;

export const CATEGORY_QUERY = gql`
query category($filter: CategoryFilter, $sortBy: [CategorySort]) {
  category(filter: $filter, sortBy: $sortBy) {
    id
    name
    description
    parentId
    slug
    categoryOrder
    language
    languageMaster
    otherLanguages {
      id
      language
      languageMaster
    }
    meta {
      id
      metaKey
      metaValue
    }
    seoTitle
    seoKeyword
    seoDescription
    createdAt
    updatedAt
  }
}
`;
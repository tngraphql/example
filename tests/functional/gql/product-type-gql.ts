/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/4/2020
 * Time: 7:16 PM
 */


const {gql} = require('apollo-server');

export const PRODUCTTYPE_LIST_QUERY = gql`
query productTypes(
  $page: Int = 1
  $filter: ProductTypeFilter
  $sortBy: [ProductTypeSort]
) {
  productTypes(page: $page, filter: $filter, sortBy: $sortBy) {
    from
    to
    perPage
    currentPage
    total
    data {
      id
      name
      productCount
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

export const PRODUCTTYPE_QUERY = gql`
query productType($filter: ProductTypeFilter, $sortBy: [ProductTypeSort]) {
  productType(filter: $filter, sortBy: $sortBy) {
    id
    name
    productCount
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

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/13/2020
 * Time: 10:48 AM
 */
const {gql} = require('apollo-server');


export const PRODUCT_BRANCH_LIST_QUERY = `
query product_branches(
  $filter: ProductBranchFilter
  $sortBy: [ProductBranchSort]
  $page: Int
  $limit: Int
) {
  data: product_branches(
    filter: $filter
    sortBy: $sortBy
    page: $page
    limit: $limit
  ) {
    from
    to
    perPage
    currentPage
    total
    data {
      id
      sku
      code
      isMaster
      fullname
      master {
        id
        name
        kind
        slug
      }
      unitValue
      unitName
      productMasterId
      branchCount
      branches {
        id
        sku
        fullname
      }
      attributes {
        id
        attribute {
          name
        }
        attributeGroup {
          name
        }
      }
      images {
        id
        image
      }
      price
      priceSale
      inventory {
        id
        quantity
      }
      requiresShipping
      weight
      weightClass
      length
      width
      height
      lengthClass
      inventoryManagement
      createdAt
      updatedAt
      deletedAt
    }
  }
}
`;


export const PRODUCT_BRANCH_QUERY = `
query product_branch(
  $filter: ProductBranchFilter
  $sortBy: [ProductBranchSort]
) {
  data: product_branch(filter: $filter, sortBy: $sortBy) {
    id
    sku
    code
    isMaster
    fullname
    master {
      id
      name
      kind
      slug
    }
    unitValue
    unitName
    productMasterId
    branchCount
    branches {
      id
      sku
      fullname
    }
    attributes {
      id
      attribute {
        name
      }
      attributeGroup {
        name
      }
    }
    images {
      id
      image
    }
    price
    priceSale
    inventory {
      id
      quantity
    }
    requiresShipping
    weight
    weightClass
    length
    width
    height
    lengthClass
    inventoryManagement
    createdAt
    updatedAt
    deletedAt
  }
}
`;
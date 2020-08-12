/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/4/2020
 * Time: 7:16 PM
 */


const {gql} = require('apollo-server');

export const PRODUCTVENDOR_LIST_QUERY = gql`
query productVendors(
  $page: Int = 1
  $limit: Int = 20
  $filter: ProductVendorFilter
  $sortBy: [ProductVendorSort]
) {
  productVendors(page: $page, filter: $filter, sortBy: $sortBy, limit: $limit) {
    from
    to
    perPage
    currentPage
    total
    data {
      id
      name
      createdAt
      updatedAt
    }
  }
}
`;

export const PRODUCTVENDOR_QUERY = gql`
query productType($filter: ProductVendorFilter, $sortBy: [ProductVendorSort]) {
  productVendor(filter: $filter, sortBy: $sortBy) {
    id
    name
    createdAt
    updatedAt
  }
}
`;

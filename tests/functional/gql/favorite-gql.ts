/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/13/2020
 * Time: 9:44 AM
 */

const { gql } = require('apollo-server');


export const FAVORITE_LIST_QUERY = gql`
query favorites(
  $page: Int
  $limit: Int = 20
  $filter: FavoriteFilter
  $sortBy: [FavoriteSort]
) {
  favorites(page: $page, limit: $limit, filter: $filter, sortBy: $sortBy) {
    from
    to
    perPage
    currentPage
    total
    data {
      id
      favoriteableId
      favoriteableType
      userId
      user {
        id
        name
      }
      createdAt
      updatedAt
      createdAt
      updatedAt
    }
  }
}`;


export const FAVORITE_QUERY = gql`
query favorite($filter: FavoriteFilter, $sortBy: [FavoriteSort]) {
  favorite(filter: $filter, sortBy: $sortBy) {
    id
    favoriteableId
    favoriteableType
    userId
    user {
      id
      name
    }
    createdAt
    updatedAt
    createdAt
    updatedAt
  }
}
`;

export const FAVORITE_LIST_FOR_USER_QUERY = gql`
query favoritesUser(
  $page: Int
  $limit: Int = 20
  $filter: FavoriteFilter
  $sortBy: [FavoriteSort]
) {
  favorites: favoritesUser(page: $page, limit: $limit, filter: $filter, sortBy: $sortBy) {
    from
    to
    perPage
    currentPage
    total
    data {
      id
      favoriteableId
      favoriteableType
      userId
      user {
        id
        name
      }
      createdAt
      updatedAt
      createdAt
      updatedAt
    }
  }
}`;
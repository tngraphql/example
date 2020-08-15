/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/13/2020
 * Time: 10:48 AM
 */
const {gql} = require('apollo-server');

export const UPDATE_PRODUCT = gql`
    mutation productUpdate(
        $id: ID_CRYPTO
        $name: String
        $avatar: String
        $imageType: String
        $description: Html
        $content: Html
        $productVendorId: ID_CRYPTO
        $tags: [String]
        $categories: [ID_CRYPTO]
        $branches: [ProductBranchInput]
        $meta: [MetaInput]
        $kind: ProductKind
    ) {
        productUpdate(
            id: $id
            name: $name
            avatar: $avatar
            imageType: $imageType
            description: $description
            content: $content
            productVendorId: $productVendorId
            tags: $tags
            categories: $categories
            branches: $branches
            meta: $meta
            kind: $kind
        ) {
            id
            name
            kind
            description
            content
            avatar
            imageType
            meta {
                id
                metaKey
                metaValue
            }
            categories {
                id
                name
            }
            tags {
                id
                name
                text: name
            }
            productVendorId
            vendor{
                id
                name
            }
            branches{
                id
                sku
                code
                fullname
                requiresShipping
                inventory{
                    id
                    quantity
                }
                master{
                    id
                    name
                }
                attributes{
                    id
                    group: attributeGroup{
                        id
                        name
                    }
                    attribute{
                        id
                        name
                    }
                }
                images{
                    id
                    thumbnailId
                    image
                    thumbnail {
                        id
                        guid
                        data
                    }
                }
                price
                priceSale
                weight
                length
                width
                height
            }
        }
    }
`;

export const PRODUCT_MASTER_LIST_QUERY = `
query product_master_list(
        $filter: ProductMasterFilter
        $sortBy: [ProductMasterSort]
        $limit: Int = 20
        $page: Int = 1
    ) {
        data: product_master_list(
            filter: $filter
            sortBy: $sortBy
            limit: $limit
            page: $page
        ) {
            data {
                id
                name
                kind
                avatar
                content
                inventory
                productTypeId
                branchCount
                isFeatured
                tags {
                    id
                    name
                }
                categories {
                    id
                    name
                }
                productVendorId
                vendor {
                    id
                    name
                }
                branches {
                    id
                    sku
                    code
                    fullname
                    branchCount
                    price
                    master {
                        id
                        name
                    }
                    images {
                        id
                        productMasterId
                        thumbnailId
                        image
                        thumbnail {
                            id
                            guid
                            data
                        }
                    }
                }
                attributeGroups {
                    id
                }
                createdAt
            }
            from
            to
            perPage
            currentPage
            total
        }
    }
`;

export const PRODUCT_MASTER_QUERY = `
query product_master($filter: ProductMasterFilter, $sortBy: [ProductMasterSort]) {
        data: product_master(filter: $filter, sortBy: $sortBy) {
            id
            name
            kind
            isFeatured
            description
            content
            avatar
            imageType
            views
            commentStatus
            productTypeId
            commentCount
            meta {
                id
                metaKey
                metaValue
            }
            categories {
                id
                name
            }
            tags {
                id
                name
                text: name
            }
            productVendorId
            vendor {
                id
                name
            }
            branches {
                id
                sku
                code
                fullname
                requiresShipping
                inventory {
                    id
                    quantity
                }
                master {
                    id
                    name
                }
                attributes {
                    id
                    group: attributeGroup {
                        id
                        name
                    }
                    attribute {
                        id
                        name
                    }
                }
                images {
                    id
                    image
                    thumbnailId
                    thumbnail {
                        id
                        guid
                        data
                    }
                }
                price
                priceSale
                weight
                length
                width
                height
            }
        }
    }
`;

export const CREATE_PRODUCT = gql`
    mutation productCreate(
        $name: String
        $avatar: String
        $imageType: String
        $description: Html
        $content: Html
        $tags: [String]
        $categories: [ID_CRYPTO]
        $branches: [ProductBranchInput]
        $meta: [MetaInput]
    ) {
        data: productCreate(
            name: $name
            avatar: $avatar
            imageType: $imageType
            description: $description
            content: $content
            tags: $tags
            categories: $categories
            branches: $branches
            meta: $meta
        ) {
            id
            name
            content
            inventory
            productTypeId
            branchCount
            branches {
                id
                sku
                code
                fullname
            }
            attributeGroups {
                id
                sku
            }
            createdAt
        }
    }
`;
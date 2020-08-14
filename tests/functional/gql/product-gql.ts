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
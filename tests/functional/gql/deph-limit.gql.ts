/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/17/2020
 * Time: 8:39 AM
 */

export const DEPH_LIMIT_PAGE = `
query menus {
  menus {
    from
    data {
      id
      name
      alias

      menuItems {
        id
        title
        menu {
          id
          name
          menuItems {
            id
            title
            menu {
              id
              name
              menuItems {
                id
                title
                menu {
                  id
                  name
                  menuItems {
                    id
                    title
                    menu {
                      id
                      name
                      menuItems {
                        id
                        title
                        menu {
                          id
                          name
                          menuItems {
                            id
                            title
                            menu {
                              id
                              name
                            }
                            objectItem {
                              id
                              name
                              slug
                            }
                          }
                        }
                        objectItem {
                          id
                          name
                          slug
                        }
                      }
                    }
                    objectItem {
                      id
                      name
                      slug
                    }
                  }
                }
                objectItem {
                  id
                  name
                  slug
                }
              }
            }
            objectItem {
              id
              name
              slug
            }
          }
        }
        objectItem {
          id
          name
          slug
        }
      }
      automanticallyMenu
      headerNavigation {
        id
        name
        alias
        description
      }
      __typename
    }
  }
}
`
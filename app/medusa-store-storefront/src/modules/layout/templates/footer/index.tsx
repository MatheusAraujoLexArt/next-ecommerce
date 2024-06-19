import { Text, clx } from "@medusajs/ui"

import { getCategoriesList, getCollectionsList } from "@lib/data"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import MedusaCTA from "@modules/layout/components/medusa-cta"

export default async function Footer() {
  const { collections } = await getCollectionsList(0, 6)
  const { product_categories } = await getCategoriesList(0, 6)

  return (
    <footer className="border-t border-ui-border-base w-full text-secondaryColor bg-primaryColor">
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-6 xsmall:flex-row items-start justify-between py-40">
          <div>
            <LocalizedClientLink
              href="/"
              className="text-secondaryColor txt-compact-xlarge-plus uppercase"
            >
              LexGift
            </LocalizedClientLink>
          </div>
          <div className="text-small-regular gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-3">
            {product_categories && product_categories?.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="text-lg">
                  Categories
                </span>
                <ul className="grid grid-cols-1 gap-2" data-testid="footer-categories">
                  {product_categories?.slice(0, 6).map((c) => {
                    if (c.parent_category) {
                      return
                    }

                    const children =
                      c.category_children?.map((child) => ({
                        name: child.name,
                        handle: child.handle,
                        id: child.id,
                      })) || null

                    return (
                      <li
                        className="flex flex-col gap-2 text-ui-fg-subtle txt-small"
                        key={c.id}
                      >
                        <p className="group relative w-max">
                          <LocalizedClientLink
                            className={clx(
                              "text-secondaryColor",
                              "text-secondaryColor",
                              children && "txt-small-plus"
                            )}
                            href={`/categories/${c.handle}`}
                            data-testid="category-link"
                          >
                            {c.name}
                          </LocalizedClientLink>
                          <span className="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-[#43baff] group-hover:w-full"></span>
                        </p>
                        {children && (
                          <ul className="grid grid-cols-1 ml-3 gap-2">
                            {children &&
                              children.map((child) => (
                                <li key={child.id}>
                                  <LocalizedClientLink
                                    className="hover:text-ui-fg-base"
                                    href={`/categories/${child.handle}`}
                                    data-testid="category-link"
                                  >
                                    {child.name}
                                  </LocalizedClientLink>
                                </li>
                              ))}
                          </ul>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="text-lg">
                  Collections
                </span>
                <ul
                  className={clx(
                    "text-secondaryColor grid grid-cols-1 gap-2 txt-small",
                    {
                      "grid-cols-2": (collections?.length || 0) > 3,
                    }
                  )}
                >
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <p className="group relative w-max">
                          <LocalizedClientLink
                            className={clx(
                              "text-secondaryColor",
                            )}
                            href={`/collections/${c.handle}`}
                            data-testid="category-link"
                          >
                            {c.title}
                          </LocalizedClientLink>
                          <span className="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-[#43baff] group-hover:w-full"></span>
                        </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-col gap-y-2">
              <span className="text-lg">Medusa</span>
              <ul className="grid grid-cols-1 gap-y-2 text-ui-fg-subtle txt-small">
                <li>
                  <p className="group relative w-max">
                    <a
                      href="https://github.com/medusajs"
                      target="_blank"
                      rel="noreferrer"
                      className="text-secondaryColor"
                    >
                      GitHub
                    </a>
                    <span className="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-[#43baff] group-hover:w-full"></span>
                  </p>
                </li>
                <li>
                  <p className="group relative w-max">
                    <a
                      href="https://docs.medusajs.com"
                      target="_blank"
                      rel="noreferrer"
                      className="text-secondaryColor"
                    >
                      Documentation
                    </a>
                    <span className="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-[#43baff] group-hover:w-full"></span>
                  </p>
                </li>
                <li>
                  <p className="group relative w-max">
                    <a
                      href="https://github.com/medusajs/nextjs-starter-medusa"
                      target="_blank"
                      rel="noreferrer"
                      className="text-secondaryColor"
                    >
                      Source code
                    </a>
                    <span className="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-[#43baff] group-hover:w-full"></span>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex w-full mb-16 justify-between text-ui-fg-muted">
          <Text className="txt-compact-medium text-whiteWithBlurColor opacity-70">
            LexGift ® {new Date().getFullYear()}. All rights reserved.
          </Text>
          <MedusaCTA />
        </div>
      </div>
    </footer>
  )
}

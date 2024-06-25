import { Suspense } from "react"

import { listRegions } from "@lib/data"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import Logo from '../../../../assets/lexgift_small_logo.png'
import Image from "next/image"

export default async function Nav() {
  const regions = await listRegions().then((regions) => regions)

  return (
    <div className="sticky top-0 inset-x-0 z-50">
      <header className="relative h-16 mx-auto border-b duration-200 bg-blackColor border-ui-border-base">
        <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular">
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full">
              <SideMenu regions={regions} />
            </div>
          </div>

          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="text-secondaryColor text-3xl txt-compact-xlarge-plus hover:opacity-800 uppercase"
              data-testid="nav-store-link"
            >
              LexProducts
              {/* <div className="pt-4 pb-4">
                <Image
                  src={Logo}
                  alt="logo"
                  layout="cover"
                  quality={100}
                  height={60}
                />
                </div> */}
            </LocalizedClientLink>
          </div>

          <div className="hidden sm:flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full">
              {process.env.FEATURE_SEARCH_ENABLED && (
                <LocalizedClientLink
                  className="text-secondaryColor text-base"
                  href="/search"
                  scroll={false}
                  data-testid="nav-search-link"
                >
                  Search
                </LocalizedClientLink>
              )}
              <p className="group relative w-max">
                <LocalizedClientLink
                  className="text-secondaryColor text-base"
                  href="/account"
                  data-testid="nav-account-link"
                >
                  Account
                </LocalizedClientLink>
                <span className="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-[#43baff] group-hover:w-full"></span>
              </p>
            </div>
            <Suspense
              fallback={
                <p className="group relative w-max">
                <LocalizedClientLink
                  className="text-secondaryColor text-base flex gap-2"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  Cart (0)
                </LocalizedClientLink>
                <span className="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-[#43baff] group-hover:w-full"></span>
                </p>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}

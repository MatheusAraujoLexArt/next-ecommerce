import { Text } from "@medusajs/ui"

import Medusa from "../../../common/icons/medusa"
import NextJs from "../../../common/icons/nextjs"

const MedusaCTA = () => {
  return (
    <Text className="flex gap-x-2 txt-compact-medium items-center text-whiteWithBlurColor opacity-70">
      Powered by
      <a href="https://lexartlabs.com/" target="_blank" rel="noreferrer">
        Lexart Labs
      </a>
    </Text>
  )
}

export default MedusaCTA

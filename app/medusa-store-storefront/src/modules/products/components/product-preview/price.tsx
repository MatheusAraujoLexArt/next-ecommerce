import { Text, clx } from "@medusajs/ui"

import { PriceType } from "../product-actions"

export default async function PreviewPrice({ price }: { price: PriceType }) {
  return (
    <>
      {price.price_type === "sale" && (
        <Text className="text-whiteWithBlurColor opacity-70 line-through" data-testid="original-price">
          {price.original_price}
        </Text>
      )}
      <Text
        className={clx("text-ui-fg-muted", "text-whiteWithBlurColor", "opacity-70", {
          "text-ui-fg-interactive": price.price_type === "sale",
        })}
        data-testid="price"
      >
        {price.calculated_price}
      </Text>
    </>
  )
}

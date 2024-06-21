import { ProductVariant } from "@medusajs/medusa"
import { Text } from "@medusajs/ui"

type LineItemOptionsProps = {
  variant: ProductVariant
  'data-testid'?: string
  'data-value'?: ProductVariant
}

const LineItemOptions = ({ variant, 'data-testid': dataTestid, 'data-value': dataValue }: LineItemOptionsProps) => {
  return (
    <Text data-testid={dataTestid} data-value={dataValue} className="text-secondaryColor inline-block txt-medium w-full overflow-hidden text-ellipsis">
      Variant: {variant.title}
    </Text>
  )
}

export default LineItemOptions

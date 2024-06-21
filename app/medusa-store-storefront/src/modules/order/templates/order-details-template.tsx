"use client"

import { Order } from "@medusajs/medusa"
import { XMark } from "@medusajs/icons"
import React from "react"

import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OrderDetails from "@modules/order/components/order-details"
import OrderSummary from "@modules/order/components/order-summary"
import ShippingDetails from "@modules/order/components/shipping-details"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type OrderDetailsTemplateProps = {
  order: Order
}

const OrderDetailsTemplate: React.FC<OrderDetailsTemplateProps> = ({
  order,
}) => {
  return (
    <div className="bg-blackColor flex flex-col justify-center gap-y-4">
      <div className="flex gap-2 justify-between items-center">
        <h1 className="text-secondaryColor text-2xl-semi">Order details</h1>
        <LocalizedClientLink
          href="/account/orders"
          className="text-secondaryColor flex gap-2 items-center hover:text-ui-fg-base"
          data-testid="back-to-overview-button"
        >
          <XMark /> Back to overview
        </LocalizedClientLink>
      </div>
      <div
        className="flex flex-col gap-4 h-full bg-blackColor w-full"
        data-testid="order-details-container"
      >
        <OrderDetails order={order} showStatus />
        <Items items={order.items} region={order.region} />
        <ShippingDetails order={order} />
        <OrderSummary order={order} />
        <Help />
      </div>
    </div>
  )
}

export default OrderDetailsTemplate

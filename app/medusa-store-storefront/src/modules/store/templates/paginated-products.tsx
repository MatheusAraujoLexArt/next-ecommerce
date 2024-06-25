import { getProductsListWithSort, getRegion } from "@lib/data"
import ProductPreview from "@modules/products/components/product-preview"
import { Pagination } from "@modules/store/components/pagination"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
// import products from "@medusajs/medusa/dist/api/routes/admin/products"
// import { api } from "services/api"
// import { ProductPreviewType } from "types/global"

const PRODUCT_LIMIT = 12

type PaginatedProductsParams = {
  limit: number
  collection_id?: string[]
  category_id?: string[]
  id?: string[]
}

export default async function PaginatedProducts({
  sortBy,
  page,
  searchQuery,
  collectionId,
  categoryId,
  productsIds,
  countryCode,
}: {
  sortBy?: SortOptions
  page: number
  searchQuery: string
  collectionId?: string
  categoryId?: string
  productsIds?: string[]
  countryCode: string
}) {
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  const queryParams: PaginatedProductsParams = {
    limit: PRODUCT_LIMIT,
  }

  if (collectionId) {
    queryParams["collection_id"] = [collectionId]
  }

  if (categoryId) {
    queryParams["category_id"] = [categoryId]
  }

  if (productsIds) {
    queryParams["id"] = productsIds
  }

  const {
    response: { products, count },
  } = await getProductsListWithSort({
    page,
    queryParams,
    sortBy,
    countryCode,
    searchQuery,
  })

  
  // console.log('products', products)
  // console.log('count', count)
  // console.log('obj', {
  //   page,
  //   queryParams,
  //   sortBy,
  //   countryCode,
  // })


  // let filteredProducts: ProductPreviewType[] = [];
  // if(searchQuery) {
  //   console.log('ativa função de filtro')

  //   await api.get(`http://localhost:9001/search?q=${searchQuery}`)
  //   .then((response) => {
  //     filteredProducts = response.data;
  //   })
  // }

  // const productsArrayCondition: ProductPreviewType[] = searchQuery ? filteredProducts : products;
  // const countCondition: number = searchQuery ? filteredProducts.length : count;

  const totalPages = Math.ceil(count / PRODUCT_LIMIT)
  // const totalPages = Math.ceil(countCondition / PRODUCT_LIMIT);

  // console.log('teste', {
  //   page
  // })
  // console.log('teste', {
  //   page,
  //   totalPages,
  //   countCondition,
  // })
  // console.log('searchQuery', searchQuery)
  
  return (
    <>
      <ul className="grid grid-cols-2 w-full small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8" data-testid="products-list">
        {products.map((p) => {
          return (
            <div className="product-wrapper" key={p.id}>
              <li>
                <ProductPreview productPreview={p} region={region} />
              </li>
            </div>
          )
        })}
      </ul>
      {totalPages > 1 && <Pagination data-testid="product-pagination" page={page} totalPages={totalPages} />}
    </>
  )
}

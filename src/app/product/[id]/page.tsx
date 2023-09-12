import React, { cache } from "react";
import { client } from "../../../../sanity/ecommerce/lib/client";

import ProductDescription from "../(ProductDetailsComponents)/ProductDescription";
import Product from "@/components/Product";
import ProductImage from "../(ProductDetailsComponents)/ProductImage";

export const getData = cache(async (id: string) => {
  const query = `*[_type == "product" && slug.current == '${id}'][0]`;
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);
  return { product, products };
});

async function ProductDetails({ params: { id } }: { params: { id: string } }) {
  const {
    product,
    products,
  }: { product: ProductType; products: ProductType[] } = await getData(id);

  return (
    <div>
      <div className="product-detail-container">
        <ProductImage product={product} />
        <ProductDescription product={product} />
      </div>
      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container">
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;

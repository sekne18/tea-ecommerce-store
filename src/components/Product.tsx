import Link from "next/link";
import React from "react";
import { urlFor } from "../../sanity/ecommerce/lib/image";

function Product({
  product: { image, name, slug, price },
}: {
  product: ProductType;
}) {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <img
            src={urlFor(image && image[0]).url()}
            width={250}
            height={250}
            className="product-image"
          />
          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  );
}

export default Product;

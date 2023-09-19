"use client";
import React, { useState } from "react";
import { urlFor } from "../../../../sanity/ecommerce/lib/image";
import { useStateContext } from "@/app/context/StateContext";

function ProductImage({ product }: { product: ProductType }) {
  const [index, setIndex] = useState(0);

  return (
    <div>
      <div className="image-container">
        <img
          className="product-detail-image"
          src={urlFor(product.image && product.image[index]).url()}
        />
      </div>
      <div className="small-images-container">
        {product.image?.map((item: string, i: number) => (
          <img
            key={i}
            src={urlFor(item).url()}
            className={
              i === index ? "small-image selected-image" : "small-image"
            }
            onMouseEnter={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductImage;

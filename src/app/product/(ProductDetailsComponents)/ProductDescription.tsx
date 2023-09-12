"use client";
import { useStateContext } from "@/app/context/StateContext";
import React, { useState } from "react";
import {
  AiFillStar,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineStar,
} from "react-icons/ai";

function ProductDescription({ product }: { product: ProductType }) {
  const { decQty, incQty, qty, onAdd } = useStateContext();
  return (
    <div className="product-detail-desc">
      <h1>{product.name}</h1>
      <div className="reviews">
        <div>
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiOutlineStar />
        </div>
        <p>(20)</p>
      </div>
      <h4>Details: </h4>
      <p>{product.details}</p>
      <p className="price">${product.price}</p>
      <div className="quantity">
        <h3>Quantity:</h3>
        <p className="quantity-desc">
          <span className="minus" onClick={decQty}>
            <AiOutlineMinus />
          </span>
          <span className="num">{qty}</span>
          <span className="plus" onClick={incQty}>
            <AiOutlinePlus />
          </span>
        </p>
      </div>
      <div className="buttons">
        <button
          type="button"
          className="add-to-cart"
          onClick={() => onAdd(product, qty)}
        >
          Add to Cart
        </button>
        <button type="button" className="buy-now">
          Buy Now
        </button>
      </div>
    </div>
  );
}

export default ProductDescription;

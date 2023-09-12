import React from "react";

import { client } from "../../sanity/ecommerce/lib/client";
import HeroBanner from "@/components/HeroBanner";
import FooterBanner from "@/components/FooterBanner";
import Product from "@/components/Product";

async function getDataFromSanityServer(): Promise<{
  products: ProductType[];
  bannerData: HeroBannerType[];
}> {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);
  const bannerQuery = '*[product == "darjeeling"]';
  const bannerData = await client.fetch(bannerQuery);
  return { products, bannerData };
}

async function Home() {
  const data: {
    products: ProductType[];
    bannerData: HeroBannerType[];
  } = await getDataFromSanityServer();

  return (
    <div>
      <HeroBanner heroBanner={data.bannerData && data.bannerData[0]} />
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Teas of many flavours</p>
      </div>
      <div className="products-container">
        {data.products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <FooterBanner footerBanner={data.bannerData && data.bannerData[0]} />
    </div>
  );
}

export default Home;

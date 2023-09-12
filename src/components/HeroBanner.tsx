import Link from "next/link";
import React from "react";
import { urlFor } from "../../sanity/ecommerce/lib/image";

function HeroBanner({ heroBanner }: { heroBanner: HeroBannerType }) {
  console.log();
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{heroBanner.smallText}</p>
        <h3>{heroBanner.midText}</h3>
        <img
          src={urlFor(heroBanner.image).url()}
          alt="teas"
          className="hero-banner-image"
        />
        <div>
          <Link href={`/product/${heroBanner.product}`}>
            <button type="button">{heroBanner.buttonText}</button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>{heroBanner.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;

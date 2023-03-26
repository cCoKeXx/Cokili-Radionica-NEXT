import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

import { urlFor } from "../lib/client";

const Product = ({ product }) => {
  const router = useRouter();
  const { subSlug } = router.query;
  const { image, imageUrl, name, price, slug } = product;
  return (
    <div>
      <Link href={`${subSlug}/${slug.current}`}>
        <div className="product-card">
          <Image
            src={image ? urlFor(image[0]).url() : imageUrl[0]}
            width={250}
            height={250}
            unoptimized={true}
            className="product-image"
          />
          <p className="product-name">{name}</p>
          <div className="price-container">
            <p className="product-price">{price} </p>
            <p className="curency">din</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Product;

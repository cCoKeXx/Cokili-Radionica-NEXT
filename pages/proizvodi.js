import React, { useEffect } from "react";
import { client, urlFor } from "../lib/client";
import Link from "next/link";
import Image from "next/image";
//com StateContext
import { useStateContext } from "../context/StateContext";

const proizvodi = ({ products }) => {
  const { toggleHome } = useStateContext();
  useEffect(() => {
    toggleHome(false);
    const navBar = document.getElementById("navbar");
    navBar.classList.add("navbar-nonFixed");
    return () => {
      navBar.classList.remove("navbar-nonFixed");
    };
  }, []);

  return (
    <div className="proizvodi">
      <div className="background">
        <Image
          src="/Products/background.jpg"
          alt="background"
          unoptimized={true}
          style={{objectFit:"cover"}}
          fill
        />
      </div>

      <div className="products-container">
        {products.map((product) => (
          <Link
            href={`/proizvodi/${product.subSlug.current}`}
            key={product.subName}
          >
            <div className="subProduct-container">
              <h1 className="subProduct-name">{product.subName}</h1>
              <div className="subProduct-imageTint"></div>
              <Image
                src={product.subImage ? urlFor(product.subImage[0]).url() : ""}
                fill
                unoptimized={true}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "subProduct"]';
  const products = await client.fetch(query);

  return {
    props: { products },
  };
};

export default proizvodi;

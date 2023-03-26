import React, { useEffect } from "react";
import Image from "next/image";
//com Sanity
import { client } from "../../lib/client";

//com Components
import { Product } from "../../components";

//com State Context
import { useStateContext } from "../../context/StateContext";
const podPodela = ({ arrayOfProducts }) => {
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
    <div className="subSlug">
      <div className="background">
        <Image
          src="/Products/background.jpg"
          alt="Background"
          fill
          style={{objectFit:'cover'}}
        />
      </div>
      <div className="products-container">
        {arrayOfProducts.map((product) => (
          <Product key={product.slug.current} product={product} />
        ))}
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const subProductQuery = `*[_type == "subProduct"]{
      subSlug{
          current
      }
  }`;
  const productQuery = `*[_type == "subProduct.proizvodi"]{
      slug{
          current
      }
  }`;
  const subProductSlugs = await client.fetch(subProductQuery);
  const productSlugs = await client.fetch(productQuery);

  const paths = [];
  for (const product of productSlugs) {
    paths.push({
      params: { subSlug: subProductSlugs.current, slug: product.slug.current },
    });
  }
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { subSlug } }) => {
  const query = `*[_type == "subProduct" && subSlug.current == '${subSlug}']{products}`;
  let arrayOfProducts = await client.fetch(query);
  arrayOfProducts = arrayOfProducts[0].products;

  return {
    props: { arrayOfProducts },
    revalidate: 10,
  };
};

export default podPodela;

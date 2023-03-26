import React, { useState, useEffect } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Image from "next/image";

//com Sanity
import { client, urlFor } from "../../../lib/client";

//com State context
import { useStateContext } from "../../../context/StateContext";

const ProductDetails = ({ product }) => {
  const { decQty, incQty, qty, onAdd, toggleHome } = useStateContext();
  const { image, imageUrl, name, details, price } = product;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    toggleHome(false);
    const navBar = document.getElementById("navbar");
    navBar.classList.add("navbar-nonFixed");
    return () => {
      navBar.classList.remove("navbar-nonFixed");
    };
  }, []);
  return (
    <div className="slug">
      <div className="background">
        <Image
          src="/Products/backgroundLight.jpg"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <div className="product-detail-image">
              <Image
                src={image ? urlFor(image[index]).url() : imageUrl[index]}
                unoptimized={true}
                width={400}
                height={400}
                className="product-detail-image"
              />
            </div>
          </div>
          <div className="small-images-container">
            {image
              ? image.map((item, i) => (
                  <Image
                    src={urlFor(image[i]).url()}
                    className={
                      i === index ? "small-image selected-image" : "small-image"
                    }
                    onMouseEnter={() => setIndex(i)}
                    key={product.name + item}
                    unoptimized={true}
                    width={70}
                    height={70}
                  />
                ))
              : imageUrl.map((item, i) => (
                  <Image
                    src={imageUrl[i]}
                    className={
                      i === index ? "small-image selected-image" : "small-image"
                    }
                    onMouseEnter={() => setIndex(i)}
                    key={product.name + item}
                    unoptimized={true}
                    width={70}
                    height={70}
                  />
                ))}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          {product.details && <h4>Opis:</h4>}
          <p className="desc">{details}</p>
          <p className="price">{price} din</p>
          <div className="quantity">
            <h3>Količina:</h3>
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
              className="buy-now"
              onClick={() => onAdd(product, qty)}
            >
              Dodaj u korpu
            </button>
          </div>
        </div>
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

export const getStaticProps = async ({ params: { subSlug, slug } }) => {
  const query = `*[_type == "subProduct" && subSlug.current == '${subSlug}']{products}`;
  let product = await client.fetch(query);
  product = product[0].products;

  product = product.find((product) => product.slug.current == slug);

  return {
    props: { product },
    revalidate: 10,
  };
};

export default ProductDetails;

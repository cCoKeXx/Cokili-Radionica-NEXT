import React from "react";
import Link from "next/link";

const Card = ({ image, text, link, url }) => {
  return (
    <div className="card">
      <img src={image} alt="" />
      <p>{text}</p>
      {link != "" ? (
        <Link href={link}>
          <button type="button" className="btn">
            POSETI
          </button>
        </Link>
      ) : (
        <a href={url} target="_blank">
          <button type="button" className="btn">
            POSETI
          </button>
        </a>
      )}
    </div>
  );
};

export default Card;

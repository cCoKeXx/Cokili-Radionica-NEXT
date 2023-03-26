import React, { useRef } from "react";
import Link from "next/link";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";

const Cart = () => {
  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuantity,
    onRemove,
  } = useStateContext();

  console.log(cartItems);
  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Vaša korpa</span>
          <span className="cart-num-items">({totalQuantities})</span>
        </button>
        {cartItems.length < 1 && (
          <div className="empty-cart">
            <div>
              <AiOutlineShopping size={150} />
              <h3>Vaša korpa je prazna</h3>
            </div>
            <Link href="/proizvodi">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Nastavite sa kupovinom
              </button>
            </Link>
          </div>
        )}
        <div className="product-container">
          {cartItems.length >= 1 &&
            cartItems.map((item, index) => (
              <div className="product" key={item["name"] + index}>
                <div className="cart-product-image-container">
                  <img
                    src={item.image ? urlFor(item.image[0]) : item.imageUrl[0]}
                    className="cart-product-image"
                  />
                </div>
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.name}</h5>
                    <h4>{item.price} din</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span
                          className="minus"
                          onClick={() =>
                            toggleCartItemQuantity(item.slug.current, "dec")
                          }
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className="num">{item.quantity}</span>
                        <span
                          className="plus"
                          onClick={() =>
                            toggleCartItemQuantity(item.slug.current, "inc")
                          }
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => onRemove(item)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Ukupno:</h3>
              <h3>{totalPrice} din</h3>
            </div>
            <div className="btn-container">
              <Link href={`/${encodeURIComponent("poručivanje")}`}>
                <button
                  type="button"
                  className="btn"
                  onClick={() => setShowCart(false)}
                >
                  {" "}
                  Poručite{" "}
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Image from "next/image";

import { useRouter } from "next/router";

import { urlFor } from "../lib/client";

//com State Context
import { useStateContext } from "../context/StateContext";

const form = () => {
  const { setShowCart, toggleHome, cartItems, totalPrice } = useStateContext();
  useEffect(() => {
    toggleHome(false);
    const navBar = document.getElementById("navbar");
    navBar.classList.add("navbar-nonFixed");
    return () => {
      navBar.classList.remove("navbar-nonFixed");
    };
  }, []);
  const router = useRouter();

  const form = useRef();

  let [name, setName] = useState("");
  let [lastName, setLastName] = useState("");
  let [adress, setAdress] = useState("");
  let [pNumber, setPNumber] = useState("");
  let [town, setTown] = useState("");
  let [email, setEmail] = useState("");
  let [number, setNumber] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    if (
      name.length < 1 ||
      lastName.length < 1 ||
      adress.length < 1 ||
      pNumber.length < 1 ||
      town.length < 1 ||
      email.length < 1 ||
      number.length < 1
    ) {
      document.getElementById("error_message").innerHTML =
        "Molim vas popunite celu tabelu";
      document.getElementById("error_message").className = "contact_error";
    } else {
      emailjs
        .sendForm(
          process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID,
          process.env.NEXT_PUBLIC_ORDER_EMAIL_TEMPLATE_ID,
          form.current,
          process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY
        )
        .then(
          (result) => {
            router.replace(`/${encodeURIComponent("uspešna_porudžbina")}`);
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          }
        );
    }
  };

  useEffect(() => {
    toggleHome(false);
  }, []);

  return (
    <div className="ordering-page">
      {/* <img src="/Products/background.jpg" alt="" className="background" /> */}
      <div className="background" >
        <Image src="/Products/background.jpg" alt="" fill style={{objectFit:"cover"}}/>
      </div>
   
      <div className="products-to-order">
        <h2>Vaša korpa: </h2>
        {cartItems.map((item) => (
          <div className="order-product">
            <img
              src={item.imageUrl ? item.imageUrl[0] : urlFor(item.image[0])}
            />
            <div className="desc">
              <h2>{item.name}</h2>
              <h3>{`${item.quantity} * ${item.price} din = ${
                item.quantity * item.price
              } din`}</h3>
            </div>
          </div>
        ))}
        <button className="order-button" onClick={() => setShowCart(true)}>
          Izmeni
        </button>
      </div>
      <div className="ordering-form__container">
        <form ref={form} onSubmit={sendEmail} className="ordering__form">
          <div id="error_message" />
          <div className="form-background-overlay"></div>
          <div className="form-input-container">
            <label>Ime:</label>
            <input
              type="text"
              name="ime"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-input-container">
            <label>Prezime:</label>
            <input
              type="text"
              name="prezime"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="form-input-container">
            <label>Adresa:</label>
            <input
              type="text"
              name="adresa"
              onChange={(e) => setAdress(e.target.value)}
            />
          </div>

          <div className="form-input-container">
            <label>Poštanski broj:</label>
            <input
              type="text"
              name="p-broj"
              onChange={(e) => setPNumber(e.target.value)}
            />
          </div>

          <div className="form-input-container">
            <label>Grad:</label>
            <input
              type="text"
              name="grad"
              onChange={(e) => setTown(e.target.value)}
            />
          </div>

          <div className="form-input-container">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-input-container">
            <label>Telefon:</label>
            <input
              type="tel"
              name="telefon"
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>

          {cartItems.map((item) => (
            <input
              type="hidden"
              name="proizvodi"
              value={`《《 Ime proizvoda: ${item.name}, Cena proizvoda: ${item.price}, Količina: ${item.quantity} 》》`}
            />
          ))}
          <input type="hidden" name="ukupna cena" value={totalPrice} />

          <input type="submit" value="Poruči" className="order-button" />
        </form>
      </div>
    </div>
  );
};

export default form;

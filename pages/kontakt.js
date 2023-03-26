import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
// com React icons
import {
  AiOutlineMail,
  AiOutlinePhone,
  AiFillInstagram,
  AiFillFacebook,
} from "react-icons/ai";

import emailjs from "@emailjs/browser";

import { useStateContext } from "../context/StateContext";

const kontakt = () => {
  const { toggleHome } = useStateContext();
  useEffect(() => {
    toggleHome(false);
    const navBar = document.getElementById("navbar");
    navBar.classList.add("navbar-nonFixed");
    return () => {
      navBar.classList.remove("navbar-nonFixed");
    };
  }, []);

  const form = useRef();
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [message, setMessage] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    if (name.length < 1 || email.length < 1 || message.length < 1) {
      document.getElementById("error_message").innerHTML =
        "Molim vas popunite celu tabelu";
      document.getElementById("error_message").className = "contact_error";
    } else {
      emailjs
        .sendForm(
          process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID,
          process.env.NEXT_PUBLIC_CONTACT_EMAIL_TEMPLATE_ID,
          form.current,
          process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY
        )
        .then(
          (result) => {
            console.log(result);
            setName("");
            setEmail("");
            setMessage("");
            document.getElementById("error_message").innerHTML =
              "Uspešno poslat email! 🎉";
            document.getElementById("error_message").className =
              "contact_success";
            document.getElementById("contact-form").reset();
            setTimeout(() => {
              document.getElementById("error_message").innerHTML = "";
            }, 2000);
          },
          (error) => {
            console.log(error.text);
          }
        );
    }
  };

  return (
    <div className="contact-page">
      <div className="background">
        <Image
          src="/Contact/background.jpg"
          alt=""
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="contact-container">
        <div className="links">
          <a href="https://www.instagram.com/cokiliheklanje/" target="_blank">
            <AiFillInstagram size={50} />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=100046869857500"
            target="_blank"
          >
            <AiFillFacebook size={50} />
          </a>
        </div>
        <div style={{ width: "30%", position: "relative" }} className="picture_container">
          <Image src="/Contact/Form/picture.jpg" alt="" fill sizes='100vw' style={{objectFit:'cover'}}/>
        </div>
        <div className="content">
          <h2>Kontaktirajte nas</h2>
          <p className="heading-text">
            Ovde smo za vas! Kako možemo da Vam pomognemo?
          </p>

          <div className="contact">
            <form ref={form} onSubmit={sendEmail} id="contact-form">
              <label
                htmlFor="ime"
                id="error_message"
                className="error_message"
              ></label>
              <input
                type="text"
                name="ime"
                id="name"
                placeholder="Ime"
                onChange={(e) => setName(e.target.value)}
              ></input>
              <input
                type="email"
                name="email"
                placeholder="Email-adresa"
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              <textarea
                name="poruka"
                placeholder="Vaša poruka"
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
              <input type="submit" value="Pošalji poruku" className="btn" />
            </form>
            <div id="error" className="error_message"></div>
          </div>

          <div className="desc">
            <div className="tag">
              <AiOutlineMail size={50} className="image" />
              <a className="email" href="mailto:cokili.radionica@gmail.com">
                cokili.radionica@gmail.com
              </a>
            </div>
            <div className="tag">
              <AiOutlinePhone size={50} className="image" />
              <p>065-4270742</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default kontakt;

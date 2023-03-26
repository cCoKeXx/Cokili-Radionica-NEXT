import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";


import { Card } from "../components";

//com React Icons
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiFillInstagram,
  AiFillFacebook,
} from "react-icons/ai";

//com Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper";
import "swiper/css";
import "swiper/css/effect-cards";
//com Client for sanity api
import { client, urlFor } from "../lib/client";

//com StateContext
import { useStateContext } from "../context/StateContext";

import { motion } from "framer-motion";

const Home = ({ products }) => {
  const { toggleHome } = useStateContext();
  //framer motion varients
  const boy = {
    initial: {
      opacity: 0,
      x: "-50%",
      rotate: 20,
    },
    animate: {
      opacity: 1,
      x: "0",
      rotate: 0,
    },
  };

  const [animation, setAnimation] = useState();
  const [animation2, setAnimation2] = useState();
  useEffect(() => {
    const homepage = document.getElementById("homepage");
    const landingSection = document.getElementById("landing");
    const orderSection = document.querySelector(".how2order");
    const cardSection = document.querySelector(".cards");
    const exampleProducts = document.querySelector(".exampleProducts");
    const notesSection = document.querySelector(".notes");
    const navBar = document.getElementById("navbar");
    const cart = document.getElementsByClassName("cart-icon");
    const underline = document.getElementsByClassName("underline-active");
    const hamburgerMenu = document.getElementsByClassName("hamburger-menu");

    function handleScroll() {
      // const clientHeight = document.documentElement.clientHeight; //height of the viewport
      const landingSectionY = landingSection.getBoundingClientRect().y;
      const orderSectionY = orderSection.getBoundingClientRect().y; // start of the vieport to the top edge of the order section
      const exampleSectionY = exampleProducts.getBoundingClientRect().y;
      const cardSectionY = cardSection.getBoundingClientRect().y;
      const notesSectionY = notesSection.getBoundingClientRect().y;
      if (exampleSectionY === 0 || landingSectionY === 0) {
        //console.log('Element is in view!');
        navBar.classList.remove("hide");
      } else if (orderSectionY === 0) {
        navBar.classList.remove("hide");
        setAnimation2(true);
      } else if (cardSectionY === 0) {
        navBar.classList.remove("hide");
        setAnimation(true);
      } else if (notesSectionY === 0) {
        navBar.classList.remove("hide");
      } else {
        //console.log('Element is out of view!')
        navBar.classList.add("hide");
      }
    }

    homepage.addEventListener("scroll", handleScroll);
    return () => {
      homepage.removeEventListener("scroll", handleScroll);
      cart[0].classList.remove("navbar-white-color");
      underline[0].classList.remove("navbar-white-background");
      navBar.classList.remove("navbar-white-color");
      hamburgerMenu[0].classList.remove("navbar-white-color");
    };
  }, []);

  useEffect(() => {
    toggleHome(true);
  }, []);

  const swiperRef = useRef();
  const sliderSettings = {
    0: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
    481: {
      slidesPerView: 3,
      spaceBetween: 0,
    },
    769: {
      slidesPerView: 4,
      spaceBetween: 0,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 0,
    },
  };

  return (
    <div className="homepage" id="homepage">
      <div className="landing" id="landing">
        <motion.img
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{ duration: 1.5 }}
          src="/Homepage/Landing/stars&planets.svg"
          alt=""
          className="stars"
        />
        <div className="kidHighlight">
          <motion.img
            variants={boy}
            initial="initial"
            animate="animate"
            transition={{ duration: 1.5 }}
            src="/Homepage/Landing/Kid.svg"
            alt=""
            className="kid"
          />
          <motion.img
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{ duration: 1.5 }}
            src="/Homepage/Landing/Highlight.svg"
            alt=""
            className="highlight"
          />
        </div>
        <motion.img
          initial={{
            opacity: 0,
            x: "-150%",
          }}
          animate={{
            opacity: 1,
            x: "0",
          }}
          transition={{ duration: 1.5 }}
          src="/Homepage/Landing/Cloud.svg"
          alt=""
          className="cloud"
        />
        <motion.img
          initial={{
            opacity: 0,
            x: "-150%",
            rotate: 20,
          }}
          animate={{
            opacity: 1,
            x: "0",
            rotate: 0,
          }}
          transition={{ duration: 1.5 }}
          src="/Homepage/Landing/First plane.svg"
          alt=""
          className="first-plane"
        />
        <motion.img
          initial={{
            opacity: 0,
            x: "-150%",
            rotate: 20,
          }}
          animate={{
            opacity: 1,
            x: "0",
            rotate: 0,
          }}
          transition={{ duration: 1.5 }}
          src="/Homepage/Landing/Second plane.svg"
          alt=""
          className="second-plane"
        />
        <div className="content">
          <h1>Cokili Radionica</h1>
          <p>
            Mi smo jedna mala porodična radionica koja se bavi ručnom izradom
            patikica, igračkica i odeće kako za mlađu tako i za stariju decu.
            Ako tražite kvalitet i bezbednost za vaše mališane došli ste na
            pravo mesto.
          </p>
        </div>
      </div>

      <div className="how2order">
        <img
          src="/Homepage/Order/background.png"
          alt=""
          className="background"
        />
        <div className="image">
          <img src="/Homepage/Order/phone.svg" className="phone" />
          <motion.img
            initial={{
              rotate: "-20deg",
            }}
            whileInView={{
              rotate: "20deg",
            }}
            transition={{ duration: 2 }}
            src="/Homepage/Order/Grass.svg"
            className="grass"
            alt=""
          />
        </div>
        <motion.img
          initial={{
            rotate: "60deg",
          }}
          whileInView={{
            rotate: 0,
          }}
          transition={{ duration: 2 }}
          src="/Homepage/Order/Grass.svg"
          alt=""
          className="grass_2"
        />
        <div className="content">
          <motion.h2
            initial={{
              opacity: 0,
            }}
            animate={animation2 ? { opacity: 1 } : ""}
            transition={{ duration: 1 }}
          >
            KAKO PORUČITI
          </motion.h2>
          <motion.h1
            initial={{
              opacity: 0,
            }}
            animate={animation2 ? { opacity: 1 } : ""}
            transition={{ duration: 1, delay: 0.4 }}
          >
            NAŠE PROIZVODE
          </motion.h1>
          <motion.p
            initial={{
              opacity: 0,
            }}
            animate={animation2 ? { opacity: 1 } : ""}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Ovu stranicu smo napravili kako bi vam olakšali pri odabiru i
            kupovini naših proizvoda. Ako ipak preferirate poručivanje preko
            neke druge platforme to možete uraditi preko naše instagram I
            facebook stranice. Naše proizvode šaljemo na kućnu adresu brzom
            poštom u roku od 3 do 5 dana od primljene porudžbine a plaćanje se
            vrši pouzećem.
            <br />
            <br />
            Ukoliko ipak neki artikal koji ste izabrali nije trenutno dostupan
            kod nas mi ćemo vas u najkraćem roku obavestiti putem email-a ili
            putem telefona kojeg ste dali pri samoj porudžbini.
            <br />
            <br />
            Postoji mogućnost da izradimo neki prozvod po vašoj želji, to znači
            da ako vidite neke patikice ili šnalice u drugoj boji ili drugom
            obliku možete nas kontaktirati putem email-a ili da nas pozovete na
            telefon.
          </motion.p>
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={animation2 ? { opacity: 1 } : ""}
            transition={{ duration: 1, delay: 1.2 }}
            className="links"
          >
            <a href="https://www.instagram.com/cokiliheklanje/" target="_blank">
              <button type="button" className="link">
                INSTAGRAM
              </button>
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100046869857500"
              target="_blank"
            >
              <button type="button" className="link">
                FACEBOOK
              </button>
            </a>
            <Link href="/proizvodi">
              <button type="button" className="link">
                PROIZVODI
              </button>
            </Link>
            <Link href="/kontakt">
              <button type="button" className="link">
                KONTAKT
              </button>
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="cards">
        <div className="content">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={animation ? { opacity: 1 } : ""}
            transition={{ duration: 1 }}
          >
            KOJI SU
          </motion.h2>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={animation ? { opacity: 1 } : ""}
            transition={{ duration: 1, delay: 0.4 }}
          >
            NAŠI PROIZVODI
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={animation ? { opacity: 1 } : ""}
            transition={{ duration: 1, delay: 0.8 }}
          >
            U našoj ponudi imamo širok asortiman proizvoda. Na ovoj stranici
            možete naći pretežno heklane proizvode, odela, igračkice, patikice i
            još mnogo toga za vaše mališane.<br></br> Pored toga uz našu
            radionicu idu još dve veoma važne osobe, Kristina (slikanje na
            stiroporu) i Uroš ( Ulje na platnu, digitalni crteži, karikature,
            Grafitni portreti). Iako njihove proizvode ne možete naći na ovoj
            stranici možete ih posetiti na ova dva linka, preko kojih i
            obavljaju porudžbine.
          </motion.p>
          <motion.div
            className="links"
            initial={{ opacity: 0 }}
            animate={animation ? { opacity: 1 } : ""}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <a
              href="https://www.instagram.com/slikenastiroporu/"
              target="_blank"
            >
              <button type="button" className="link">
                KRISTINA
              </button>
            </a>
            <a
              href="https://www.instagram.com/petkovic_caricatures/"
              target="_blank"
            >
              <button type="button" className="link">
                UROŠ
              </button>
            </a>
          </motion.div>
        </div>
        <div className="swiper-container">
          <motion.img
            initial={{ opacity: 0 }}
            animate={animation ? { opacity: 1 } : ""}
            transition={{ duration: 1 }}
            src="/Homepage/Cards/Arrows/Asset 1.svg"
            alt=""
            className="arrow a1"
          />
          <motion.img
            initial={{ opacity: 0 }}
            animate={animation ? { opacity: 1 } : ""}
            transition={{ duration: 1, delay: 0.8 }}
            src="/homepage/Cards/Arrows/Asset 2.svg"
            alt=""
            className="arrow a2"
          />

          <motion.img
            initial={{
              opacity: 0,
            }}
            animate={animation ? { opacity: 1 } : ""}
            transition={{ duration: 1, delay: 0.4 }}
            src="/Homepage/Cards/Arrows/Asset 3.svg"
            alt=""
            className="arrow a3"
          />
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards]}
            className="cardSwiper"
          >
            <SwiperSlide>
              <Card
                image="/Homepage/Cards/UrosCard.jpg"
                text="Naručite karikaturu sebe ili vaših prijatelja i obradujte ih ovim savršenim
                poklonom. 🥳"
                link=""
                url="https://www.instagram.com/petkovic_caricatures/"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Card
                image="/Homepage/Cards/KristinaCard.jpg"
                text="Idealan poklon za mališane ili idealna solucija za dekoraciju objekata. 
                Ukrasite vašu rodjendansku žurku sa vašim omiljenim likovima iz crtaća."
                link=""
                url="https://www.instagram.com/slikenastiroporu/"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Card
                image="/Homepage/Cards/patikice.jpg"
                text="Veoma kvalitetne i udovne patikice za vaše mališane. Dolaze
                u raznim modelima i bojama. Ukoliko nemamo neki model u određenoj boji
                koja se vama sviđa mi se možemo dogovoriti nakon vaše porudžbine 👟."
                link="/proizvodi/patikice"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Card
                image="/Homepage/Cards/snalice.jpg"
                text="Iznenadite vašu decu ovim preslatkim šnalicama. Dolaze u raznim oblicima i bojama.
                Veoma visokog kvaliteta uz veoma niske cene 😊."
                link="/proizvodi/šnalice"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Card
                image="/Homepage/Cards/setovi.jpg"
                text="Idealan poklon za vaše mališane. Na stanju imamo razne setove za razne uzraste čiji je sadržaj
                (odela, patikice, šnalice, zvečkice, igračkice)... ili biste da napravite set po vašoj želji. Kontaktirajte nas
                kako bismo se dogovorili 😊.
                "
                link="/proizvodi/setovi"
              />
            </SwiperSlide>
          </Swiper>
        </div>
        <img
          src="/Homepage/Cards/background.png"
          alt=""
          className="background"
        />
      </div>

      {/* //com ExampleProduct SWIPER  */}
      <div className="exampleProducts">
        <img src="/Homepage/Swiper/Cloud (1).svg" alt="" className="cloud-1" />
        <img src="/Homepage/Swiper/Cloud (2).svg" alt="" className="cloud-2" />
        <img src="/Homepage/Swiper/Cloud (3).svg" alt="" className="cloud-3" />
        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          transition={{ duration: 4, type: "spring" }}
          className="helicopter"
        >
          <img
            src="/Homepage/Swiper/helicopter.svg"
            alt="helicopter"
            className="cockpit"
          />

          <div className="rotor">
            <div className="rotator">
              <div></div>
              <div></div>
            </div>
          </div>
          <div className="smallRotor">
            <div className="rotator">
              <div></div>
              <div></div>
            </div>
          </div>
          <img src="/Homepage/Swiper/Flag.svg" alt="" className="flag" />
          <img
            src="/Homepage/Swiper/FlagSmall.svg"
            alt=""
            className="flag-small"
          />
        </motion.div>

        <div className="exampleProducts-swiper">
          <div className="line" />
          <Swiper
            grabCursor={true}
            breakpoints={sliderSettings}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            className="swiper"
          >
            {products.map((product) => (
              <SwiperSlide key={product._id}>
                <img
                  src="/Homepage/Swiper/paper-clip.png"
                  className="paper-clip"
                />
                <img src={urlFor(product.image[0])} className="image" />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="swiper-buttons-container">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="swiper-button swiper-left-button"
            >
              <AiOutlineArrowLeft />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="swiper-button swiper-right-button"
            >
              <AiOutlineArrowRight />
            </button>
          </div>
        </div>
      </div>
      <div className="notes">
        <div className="notes-container">
          <div className="note">
            <img src="/Homepage/Notes/Note.svg" alt="" className="background" />
            <h2>9:00 - 21:00</h2>
            <p>Naše radno vreme</p>
          </div>
          <div className="note">
            <img src="/Homepage/Notes/Note.svg" alt="" className="background" />
            <h2>Laćarak-Srbija</h2>
            <p>
              Mi smo locirani u Laćarku, okolina Sremske Mitrovice tako da je
              moguće i lično preuzimanje proizvoda.
            </p>
          </div>
          <div className="note">
            <img src="/Homepage/Notes/Note.svg" alt="" className="background" />
            <h2>Niske cene</h2>
            <p>
              Naš prioritet je izrada vrlo kvalitetnih proizvoda uz što manju
              cenu.
            </p>
          </div>
        </div>
        <footer>
          <div className="leftSide">
            <h2>Artwork (ilustracije)</h2>
            <div>
              <p>
                Landing section -{" "}
                <a href="http://www.freepik.com" target="_blank">
                  Designed by pikisuperstar / Freepik
                </a>{" "}
              </p>
            </div>
            <div>
              <p>
                Order section -{" "}
                <a href="http://www.freepik.com" target="_blank">
                  Designed by Freepik
                </a>{" "}
              </p>
            </div>
            <div>
              <p>
                Arrows -{" "}
                <a href="http://www.freepik.com">
                  Designed by starline / Freepik
                </a>
                on Freepik
              </p>
            </div>
            <div>
              <p>
                Clouds - Image by{" "}
                <a
                  href="https://www.freepik.com/free-vector/cartoon-clouds-collection_15783479.htm#query=clouds&position=3&from_view=search&track=sph"
                  target="_blank"
                >
                  Freepik
                </a>{" "}
              </p>
            </div>
            <div>
              <p>
                Helicopter -{" "}
                <a
                  href="https://www.freepik.com/free-vector/helicopter-cartoon-vector-icon-illustration-air-transportation-icon-concept-isolated-vector-flat-cartoon-style_11886872.htm#query=helicopter%20illustration&position=6&from_view=search&track=sph"
                  target="_blank"
                >
                  Image by catalyststuff
                </a>{" "}
                on Freepik
              </p>
            </div>
            <div>
              <p>
                Sticky notes -{" "}
                <a href="http://www.freepik.com" target="_blank">
                  Designed by rawpixel.com / Freepik
                </a>
              </p>
            </div>
            <div>
              <p>
                Product background -{" "}
                <a
                  href="https://www.freepik.com/free-photo/knitting-close-up-colorful-threads-table_11260696.htm#query=knitting%204k&position=12&from_view=search&track=sph"
                  target="_blank"
                >
                  Image by Racool_studio
                </a>{" "}
                on Freepik{" "}
              </p>
            </div>
            <div>
              <p>
                Contact page background - Image by{" "}
                <a
                  href="https://www.freepik.com/free-photo/close-up-hands-knitting-sleeve_12553563.htm#query=knitting&position=15&from_view=search&track=sph"
                  target="_blank"
                >
                  Freepik
                </a>{" "}
              </p>
            </div>
            <div>
              <p>
                Contact form image -{" "}
                <a
                  href="https://www.freepik.com/free-vector/illustration-folk-seamless-pattern-ornament_5575876.htm#page=3&query=knitting&position=4&from_view=search&track=sph"
                  target="_blank"
                >
                  Image by GarryKillian
                </a>{" "}
                on Freepik{" "}
              </p>
            </div>
            <div>
              <p>
                Ordering form image -{" "}
                <a
                  href="https://www.freepik.com/free-photo/red-toy-car-with-christmas-tree-it-bunch-gifts-christmas-tree-background_14203044.htm#query=knitting%20toy&position=7&from_view=search&track=sph"
                  target="_blank"
                >
                  Image by frimufilms
                </a>{" "}
                on Freepik{" "}
              </p>
            </div>
          </div>
          <div className="rightSide">
            <h2>Cokili Radionica</h2>
            <a className="email" href="mailto:cokili.radionica@gmail.com">
              cokili.radionica@gmail.com
            </a>
            <p>065-4270742</p>
            <div>
              <a
                href="https://www.instagram.com/cokiliheklanje/"
                target="_blank"
                className="link"
              >
                <AiFillInstagram size={40} />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100046869857500"
                target="_blank"
                className="link"
              >
                <AiFillFacebook size={40} />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

//com importing images for example products
export const getServerSideProps = async () => {
  const query = '*[_type == "featureProducts" ]';
  const products = await client.fetch(query);

  return {
    props: { products },
  };
};

export default Home;

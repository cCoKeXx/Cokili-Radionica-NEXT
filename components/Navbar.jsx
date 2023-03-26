import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";

//com Icons
import { AiOutlineShopping } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";


const Menu = dynamic(() => import("./Menu"), {
  ssr: false,
  loading: () => <p>Loading</p>,
});
import { Cart } from "./";

import { useStateContext } from "../context/StateContext";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities, showMenu, setShowMenu } =
    useStateContext();

  const router = useRouter();
  const path = router.pathname.split("/");

  return (
    <nav id="navbar">
      <button
        type="button"
        className="hamburger-menu"
        onClick={() => setShowMenu(true)}
      >
        <GiHamburgerMenu size={30} />
      </button>
      {showMenu && <Menu />}
      <Link href="/" className="link-container">
        <p className="navbar-link">Početna</p>
        <div
          className={router.pathname == "/" ? "underline-active" : "hide"}
        ></div>
      </Link>

      <Link href="/proizvodi">
        <p className="navbar-link">Proizvodi</p>
        <div
          className={path[1] == "proizvodi" ? "underline-active" : "hide"}
        ></div>
      </Link>

      <Link href="/kontakt">
        <p className="navbar-link">Kontakt</p>
        <div
          className={path[1] == "kontakt" ? "underline-active" : "hide"}
        ></div>
      </Link>

      {/* //com Cart  */}
      <button
        type="button"
        className="cart-icon"
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </nav>
  );
};

export default Navbar;

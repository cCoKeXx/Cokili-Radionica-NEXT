import React from 'react'
import Link from 'next/link';


//com Icons 

import {AiOutlineCloseCircle} from 'react-icons/ai';
import  {AiFillPhone } from 'react-icons/ai';
import { MdToys } from 'react-icons/md';
import { BiHomeHeart } from 'react-icons/bi';

//com State Context 
import { useStateContext } from '../context/StateContext';

const Menu = () => {

  const {setShowMenu} = useStateContext();
  return (
    <div className='navbar-menu'>
        <button onClick={()=>{setShowMenu(false)}} className="menu-close">
            <AiOutlineCloseCircle size={22}/>
        </button>
        <Link href="/">
          <button type="button" className='navbar-menu-button' onClick={()=>{setShowMenu(false)}}>
            <p className="navbar-menu-link"> <BiHomeHeart size={20} className="navbar-menu-homebutton"/>Početna</p>
          </button>
        </Link>
        <Link href="/proizvodi">
          <button type="button" className='navbar-menu-button' onClick={()=>{setShowMenu(false)}}>
            <p className='navbar-menu-link'><MdToys size={20}/>Proizvodi</p>
          </button>
        </Link>
        <Link href="/kontakt">
        <button type="button" className='navbar-menu-button' onClick={()=>{setShowMenu(false)}}>
          <p className='navbar-menu-link'><AiFillPhone size={20}/>Kontakt</p>       
        </button>
        </Link>
    </div>
  )
}

export default Menu
import React,{useEffect } from 'react'
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';


import { useStateContext } from '../context/StateContext';
import { runFireworks } from '../lib/utils';

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities , toggleHome} = useStateContext();

  useEffect(()=>{
    const navBar = document.getElementById("navbar");
    toggleHome(false);
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    runFireworks();
    navBar.classList.add('hide');
    return () => {
      navBar.classList.remove('hide');
    }
  },[])
  return (
    <div className='success-wrapper'>
       <img src="/Success/Background.png" alt="" className='background'/>
        <div className='success'>
            <p className='icon'>
                <BsBagCheckFill/>
            </p>
            <h2>Hvala na vašoj porudžbini!</h2>
            <p className='email-msg'>Proverite vaš email za račun. Posle svake porudžbine mi vas kontaktiramo kako bismo 
            proverili vaše informacije i proizvode, ukoliko je potrebno da nešto korigujemo.
            </p>
            <p className='description'>
                Ako imate nekih pitanja, pošaljite nam email na: <a className="email" href="mailto:cokili.radionica@gmail.com">cokili.radionica@gmail.com</a>
            </p>
            <Link href="/">
                <button type="button" width="300px" className='btn'>
                    Nastavite kupovinu
                </button>
            </Link>
        </div>
    </div>
  )
}

export default Success
import React from "react";
import Head from "next/head";

import Navbar from "./Navbar";


const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Cokili Radionica</title>
        <meta
          name="google-site-verification"
          content="4gpFriRqWoc2T3-LGN-JHu1n487XYs9alIN0nKZXHTQ"
        />
        <meta
          name="description"
          content="Cokili Radionica je jedna mala porodična prodavnica koja se bavi izradom igračkica i odela za vaše mališane"
        />
        <meta
          property="og:image"
          content="/public/Homepage/Cokili-Radionica Logo.jpg"
        />
        <meta name="mobile-web-app-capable" content="yes"></meta>
      </Head>
      <header>
        <Navbar />
      </header>
      {/* <div className='workInProgress'>
        <h1>Websajt je trenutno u izradi!</h1>
        <p>Molimo Vas sačekajte zvaničnu objavu sajta koju ćemo objaviti na našoj facebook stranici</p>
        <a href="https://www.facebook.com/profile.php?id=100046869857500" target="_blank">FACEBOOK</a>
    </div> */}
      <main className="main-container">{children}</main>
      <footer>
       
      </footer>
    </div>
  );
};

export default Layout;

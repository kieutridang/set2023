'use client'
import Link from 'next/link'
import React from "react";
import Footer from './components/footer';

export default function Home() {
  return (
    <><header className="header">
      <a href="./">
        <i className="fa-solid fa-chess-board header__logo-chess-game"></i>
      </a>
      <div className="header__nav">
        <a className="accounts" href="./login">Sign in</a>
        <a className="accounts" href="./signup">Sign up</a>
        <i className="fa-solid fa-ellipsis-vertical bars"></i>
      </div>
    </header><div className="content" id="content"></div><Footer /></>
  )
}

import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="py-8 flex flex-col md:flex-row items-center justify-between">
      <Link href="/">
        <img className="w-64 mb-8 md:mb-0" src="logo.svg" alt="" />
      </Link>
      <div className="">
        <Link href="/login">
          <a className="bg-red-500 px-5 py-3 rounded-lg text-white uppercase mr-2">
            Log in
          </a>
        </Link>
        <Link href="/newaccount">
          <a className="bg-black px-5 py-3 rounded-lg text-white uppercase">
            New Account
          </a>
        </Link>
      </div>
    </header>
  );
};

export default Header;

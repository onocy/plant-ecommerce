import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUser } from "contexts/userContext";
import Image from "next/image";

const Navbar = () => {
  const { pathname } = useRouter();
  const { user, signOut } = useUser();

  return (
    <nav className="flex justify-between p-5 items-center flex-wrap ">
      <Link href="/" className="flex items-center">
        <span className="ml-2 text-4xl uppercase pr-3">Rośliny</span>
        <Image src="/logo_ii.svg" width="50" height="50" className="" alt="" />
      </Link>
      <ul className="flex gap-3 uppercase pt-5 sm:pt-0">
        <li className={pathname == "/" && "underline underline-offset-4"}>
          <Link href="/">Home</Link>
        </li>
        <li className={pathname == "/about" && "underline underline-offset-4"}>
          <Link href="/about">About Us</Link>
        </li>
        {user ? (
          <div>
            <button
              onClick={signOut}
              className="border border-solid-1 p-2 uppercase"
            >
              Sign Out
            </button>
            <div className="text-xs">{user.email}</div>
          </div>
        ) : (
          <li
            className={pathname == "/sign_in" && "underline underline-offset-4"}
          >
            <Link href="/sign_in">Sign In</Link>
          </li>
        )}
        <Link href="/cart">Cart</Link>
      </ul>
    </nav>
  );
};

export default Navbar;

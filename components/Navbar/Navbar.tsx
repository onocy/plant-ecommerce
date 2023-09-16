import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUser } from "contexts/userContext";
import Image from "next/image";

const Navbar = () => {
  const { pathname } = useRouter();
  const { user, signOut } = useUser();

  return (
    <nav className="flex justify-between p-5 items-center">
      <Link href="/" className="flex items-center">
        <span className="ml-2 text-4xl uppercase pr-3">Rośliny</span>
        <Image src="/logo_ii.svg" width="50" height="50" className="" alt="" />
      </Link>
      <ul className="flex gap-3 uppercase">
        <li className={pathname == "/" && "underline"}>
          <Link href="/">Home</Link>
        </li>
        <li className={pathname == "/about" && "underline"}>
          <Link href="/about">About Us</Link>
        </li>
        {user ? (
          <button onClick={signOut}>sign out</button>
        ) : (
          <li className={pathname == "/sign_in" && "underline"}>
            <Link href="/sign_in">Sign In</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

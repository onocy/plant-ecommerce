import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  // Use the router hook to determine the current path to conditionally apply underlines to navbar links
  // const router = useRouter();
  // const path = router.pathname;

  const { pathname } = useRouter();

  console.log(pathname, "pathname");

  return (
    <nav className="flex justify-between p-5 items-center">
      <Link href="/" className="flex items-center">
        <span className="ml-2 text-4xl uppercase pr-3">Rośliny</span>
        <img src="/logo_ii.svg" width="50" height="50" className="" alt="" />
      </Link>
      <ul className="flex gap-3 uppercase">
        <li className={pathname == "/" && "underline"}>
          <Link href="/">Home</Link>
        </li>
        <li className={pathname == "/about" && "underline"}>
          <Link href="/about">About Us</Link>
        </li>
        <li className={pathname == "/sign_in" && "underline"}>
          <Link href="/sign_in">Sign In</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

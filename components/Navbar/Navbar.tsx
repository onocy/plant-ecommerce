import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUser } from "contexts/userContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Image from "next/image";

const Navbar = () => {
  const { pathname } = useRouter();
  const { user, signOut } = useUser();
  const cartPath = pathname.includes("/cart");

  return (
    <nav className="flex justify-between p-5 items-center flex-wrap sticky top-0 z-50 backdrop-blur-sm border border-b-gray-50">
      <Link href="/" className="flex items-center">
        <span className="ml-2 text-4xl uppercase pr-3">Rośliny</span>
        <Image src="/logo_ii.svg" width="50" height="50" className="" alt="" />
      </Link>
      <div className="flex gap-3 uppercase pt-5 sm:pt-0">
        {user ? (
          <div>
            {/* <button
              onClick={signOut}
              className="border border-solid-1 p-2 uppercase"
            >
              Sign Out
            </button>
            <div className="text-xs">{user.email}</div> */}

            <div className="relative group">
              <button className="inline-flex items-center">
                <AccountCircleIcon />
              </button>

              <div className="absolute hidden group-hover:block bg-gray-200 text-gray-900 shadow-lg p-2 w-48 z-10">
                <div className="absolute top-[-16px] left-[4px] w-0 h-0 border-x-transparent border-b-gray-200 border-t-transparent border-solid border-8"></div>

                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 text-sm"
                >
                  Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 text-sm"
                  onClick={signOut}
                >
                  Sign Out ({user.email})
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div
            className={pathname == "/sign_in" && "underline underline-offset-4"}
          >
            <Link href="/sign_in">Sign In</Link>
          </div>
        )}
        {!cartPath && (
          <div className="relative group">
            <Link href="/cart">
              <ShoppingCartIcon />
            </Link>

            <div className="absolute hidden group-hover:block bg-gray-200 text-gray-900 shadow-lg p-2 w-56 z-10 left-[-20px]">
              <div className="absolute top-[-16px] left-[4px] w-0 h-0 border-x-transparent border-b-gray-200 border-t-transparent border-solid border-8"></div>

              <a href="#" className="block px-4 py-2 hover:bg-gray-100 text-sm">
                Microcart
              </a>
            </div>
          </div>
        )}
        <div className={pathname == "/" && "underline underline-offset-4"}>
          <Link href="/">Home</Link>
        </div>
        <div className={pathname == "/about" && "underline underline-offset-4"}>
          <Link href="/about">About Us</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

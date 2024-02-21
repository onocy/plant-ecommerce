import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUser } from "contexts/userContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import { useCart } from "contexts/cartContext";

const Navbar = () => {
  const router = useRouter();
  const { pathname } = router;
  const { user, signOut, cartId } = useUser();
  const { cart, updateCart } = useCart();

  const cartPath = pathname.includes("/cart");
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (cartId) {
      updateCart({ cartId });
    }
  }, [cartId]);

  return (
    <nav className="flex justify-between p-5 items-center flex-wrap sticky top-0 z-50 backdrop-blur-sm border border-b-gray-50">
      <a href="/" className="flex items-center">
        <span className="ml-2 text-4xl uppercase pr-3">Rośliny</span>
        <img src="/logo_ii.svg" width="50" height="50" alt="" />
      </a>
      {/* Desktop Navbar */}
      <div className="hidden sm:flex gap-3 uppercase pt-5 sm:pt-0">
        <div className={pathname == "/" && "underline underline-offset-4"}>
          <a href="/">Home</a>
        </div>
        <div className={pathname == "/about" && "underline underline-offset-4"}>
          <Link href="/about">About Us</Link>
        </div>

        {!cartPath && (
          <div className="relative group">
            <Link href="/cart" className="relative">
              <ShoppingCartIcon />
              <div className="absolute top-[-10px] left-[10px]">
                <div className="bg-red-600 text-white rounded-3xl px-1 text-xs">
                  {cart?.cart_items.length}
                </div>
              </div>
            </Link>

            {/* Microcart */}
            <div className="absolute hidden group-hover:block bg-white text-gray-900 shadow-xl p-4 w-96 z-10 card left-[-300px]">
              <div className="absolute top-[-16px] left-[204px] w-0 h-0 border-x-transparent border-b-white border-t-transparent border-solid border-8"></div>
              {cart?.cart_items?.map((cartItem, index) => {
                return (
                  <div
                    key={index}
                    className="flex justify-between items-center first:pt-0 pt-3"
                  >
                    <div className="flex gap-3">
                      <Image
                        src={`/images/${cartItem.plants.main_image}`}
                        width={50}
                        height={50}
                        alt={`Plant ${index + 1}`}
                        className="rounded-lg"
                      />
                      <div>
                        <div className="font-bold">{cartItem.plants.name}</div>
                        <div className="text-sm">
                          {cartItem.quantity} x ${cartItem.plants.price}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm">
                      ${(cartItem.quantity * cartItem.plants.price).toFixed(2)}
                    </div>
                  </div>
                );
              })}
              {cart?.cart_items?.length == 0 ||
                (!cart && (
                  <div className="text-center">Your cart is empty</div>
                ))}
              <button
                className="btn btn-primary btn-block mt-5 uppercase"
                onClick={() => router.push("/cart")}
              >
                View Cart
              </button>
            </div>
          </div>
        )}
        {user ? (
          <div>
            <div className="relative group">
              <button className="inline-flex items-center">
                <AccountCircleIcon />
              </button>

              <div className="absolute hidden group-hover:block bg-white text-gray-900 p-2 w-48 z-10 card shadow-xl left-[-150px]">
                <div className="absolute top-[-16px] left-[154px] w-0 h-0 border-x-transparent border-b-white border-t-transparent border-solid border-8"></div>
                <div className="px-4 py-2 hover:bg-gray-200 text-sm text-wrap">
                  <Link href="/profile">Profile</Link>
                </div>

                <div className="px-4 py-2 hover:bg-gray-200 text-sm text-wrap">
                  <Link href="#" onClick={signOut} className="text-wrap">
                    Sign out ({user.email})
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            className={pathname == "/signIn" && "underline underline-offset-4"}
          >
            <Link href="/signIn">Sign In</Link>
          </div>
        )}
      </div>

      <div className="sm:hidden relative">
        <button onClick={toggleDropdown}>
          <MenuIcon />
        </button>

        {isOpen && (
          <div
            className="absolute right-0 mt-2 text-black border rounded-lg shadow-lg w-52 bg-white"
            onClick={closeDropdown}
          >
            {/* Dropdown content goes here */}

            {!cartPath && (
              <div className="px-4 py-2 hover:bg-gray-200">
                <Link href="/cart">
                  View Cart <ShoppingCartIcon />
                </Link>
              </div>
            )}
            <div className="px-4 py-2 hover:bg-gray-200">
              <Link href="/">Home</Link>
            </div>
            <div className="px-4 py-2 hover:bg-gray-200">
              <Link href="/about">About Us</Link>
            </div>

            {!user && (
              <div className="px-4 py-2 hover:bg-gray-200">
                <Link href="/signIn">Sign In</Link>
              </div>
            )}

            {user && (
              <>
                <div className="px-4 py-2 hover:bg-gray-200">
                  <Link href="/profile">Profile</Link>
                </div>

                <div className="px-4 py-2 hover:bg-gray-200">
                  <Link href="#" onClick={signOut}>
                    Sign out ({user.email})
                  </Link>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

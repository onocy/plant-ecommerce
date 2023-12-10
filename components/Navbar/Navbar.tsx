import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUser } from "contexts/userContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Image from "next/image";
import { fetchCartData } from "utils/cart";

const Navbar = () => {
  const router = useRouter();
  const { pathname } = router;
  const { user, signOut, cartId } = useUser();
  const [microCart, setMicroCart] = useState(null);

  const cartPath = pathname.includes("/cart");

  const fetchData = useCallback(async () => {
    if (cartId) {
      const userCart = await fetchCartData(cartId);
      setMicroCart(userCart);
    }
  }, [cartId, setMicroCart]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <nav className="flex justify-between p-5 items-center flex-wrap sticky top-0 z-50 backdrop-blur-sm border border-b-gray-50">
      <Link href="/" className="flex items-center">
        <span className="ml-2 text-4xl uppercase pr-3">Rośliny</span>
        <Image src="/logo_ii.svg" width="50" height="50" className="" alt="" />
      </Link>
      <div className="flex gap-3 uppercase pt-5 sm:pt-0">
        <div className={pathname == "/" && "underline underline-offset-4"}>
          <Link href="/">Home</Link>
        </div>
        <div className={pathname == "/about" && "underline underline-offset-4"}>
          <Link href="/about">About Us</Link>
        </div>

        {!cartPath && (
          <div className="relative group">
            <Link href="/cart">
              <ShoppingCartIcon />
            </Link>

            <div className="absolute hidden group-hover:block bg-white text-gray-900 shadow-xl p-4 w-96 z-10 card left-[-300px]">
              <div className="absolute top-[-16px] left-[204px] w-0 h-0 border-x-transparent border-b-white border-t-transparent border-solid border-8"></div>
              {microCart?.cart_items?.map((cartItem, index) => {
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
              <button className="btn btn-primary btn-block mt-5 uppercase">
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
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 text-sm"
                  onClick={() => router.push("/profile")}
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
      </div>
    </nav>
  );
};

export default Navbar;

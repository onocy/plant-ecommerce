import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { deleteFromCart, fetchCartData } from "utils/cart";
import { useUser } from "contexts/userContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  // Update to use an array of quantities or adjust the cart quantities on the spot
  const [quantity, setQuantity] = useState(1);

  const { cartId } = useUser();

  const fetchData = useCallback(async () => {
    setLoading(true);
    if (cartId) {
      const userCart = await fetchCartData(cartId);
      setCart(userCart);
    }
    setLoading(false);
  }, [cartId, setCart]);

  const deleteItem = async (id) => {
    await deleteFromCart(id);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const calculateSubtotal = () => {
    return cart?.cart_items.reduce((total, item) => {
      return total + item.quantity * item.plants.price;
    }, 0);
  };

  if (cart === null && loading) {
    return <>Loading...</>;
  }

  if (cart?.cart_items?.length === 0 || cart === null) {
    return (
      <div className="flex justify-center flex-col items-center">
        <img alt="" src="/images/empty_cart.svg" width={500} height={500} />
        <div>No items in your cart</div>
      </div>
    );
  }

  console.log(cart);

  return (
    <>
      <div className="flex flex-wrap gap-3 justify-between mx-3 mt-3">
        <div className="flex-1 card shadow-xl px-5 py-3 gap-3 bg-white divide-y divide-gray-200 h-full">
          {cart?.cart_items?.map((cartItem, index) => {
            const increaseQuantity = () => setQuantity((prev) => prev + 1);
            const decreaseQuantity = () =>
              setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

            return (
              <div
                key={cartItem.id}
                className="flex first:pt-0 pt-3 items-center"
              >
                <div className="w-52">
                  <Image
                    src={`/images/${cartItem.plants.main_image}`}
                    width={100}
                    height={100}
                    alt={`Plant ${index + 1}`}
                  />
                </div>
                <div className="px-6 py-4">
                  <div className="flex justify-start flex-col">
                    <div className="font-bold">{cartItem?.plants?.name}</div>
                    <div className="whitespace-nowrap">
                      {cartItem.plants.price}
                    </div>
                  </div>
                </div>
                <div className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center">
                    <Button onClick={decreaseQuantity} className="bg-gray-200">
                      -
                    </Button>
                    <TextField
                      type="number"
                      value={quantity}
                      className="mx-2"
                      InputProps={{ inputProps: { min: 1 } }}
                    />
                    <Button onClick={increaseQuantity} className="bg-gray-200">
                      +
                    </Button>
                  </div>
                </div>
                <div className="self-center ml-auto">
                  <CloseIcon
                    className="cursor-pointer"
                    onClick={() => deleteItem(cartItem.id)}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex-1 card shadow-xl p-5 gap-1 m-1 bg-white justify-between h-96">
          <div className="mb-2 text-lg font-bold">Summary</div>
          <div className="pb-3 mb-2 border-b border-gray-300 flex justify-between">
            <div>Subtotal:</div>
            <div>{calculateSubtotal()}</div>
          </div>
          <div className="pb-3 mb-2 border-b border-gray-300 flex justify-between">
            <div>Tax:</div>
          </div>
          <div className="pb-3 mb-2 border-b border-gray-300 flex justify-between">
            <div>Coupon / Promo Code:</div>
          </div>
          <div className="font-bold pb-3 mb-2  flex justify-between">
            <div>Total:</div>
            <div>{calculateSubtotal()}</div>
          </div>
          <Button
            className="btn btn-primary"
            onClick={() => console.log("checkout")}
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  );
};

export default Cart;

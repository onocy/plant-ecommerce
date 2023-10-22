import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { deleteFromCart, fetchCartData } from "utils/cart";
import { useUser } from "contexts/userContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";

const Cart = () => {
  const [cart, setCart] = useState(null);

  // Update to use an array of quantities or adjust the cart quantities on the spot
  const [quantity, setQuantity] = useState(1);

  const { cartId } = useUser();

  const fetchData = useCallback(async () => {
    if (cartId) {
      const userCart = await fetchCartData(cartId);
      setCart(userCart);
    }
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

  if (cart === null) {
    return <>Loading...</>;
  }

  if (cart?.cart_items?.length === 0) {
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
      <div className="flex gap-3 justify-between">
        <div className="flex-1">
          <div className="min-w-full bg-white">
            <div className="bg-white border-t border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"></th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Name
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Price
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cart?.cart_items?.map((cartItem, index) => {
                    const increaseQuantity = () =>
                      setQuantity((prev) => prev + 1);
                    const decreaseQuantity = () =>
                      setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

                    return (
                      <tr key={cartItem.id}>
                        <td className="whitespace-nowrap text-right w-52 min-w-full">
                          <Image
                            src={`/images/${cartItem.plants.main_image}`}
                            width={100}
                            height={100}
                            alt={`Plant ${index + 1}`}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex gap-4 justify-start">
                            <div className="flex items-center">
                              {cartItem?.plants?.name}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex items-center">
                            <Button
                              onClick={decreaseQuantity}
                              className="bg-gray-200"
                            >
                              -
                            </Button>
                            <TextField
                              type="number"
                              value={quantity}
                              className="mx-2"
                              InputProps={{ inputProps: { min: 1 } }}
                            />
                            <Button
                              onClick={increaseQuantity}
                              className="bg-gray-200"
                            >
                              +
                            </Button>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          {cartItem.plants.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex gap-2 justify-end">
                            <CloseIcon
                              className="cursor-pointer"
                              onClick={() => deleteItem(cartItem.id)}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="font-bold mb-2">Summary</div>
          <div className="mb-2">Subtotal: {calculateSubtotal()}</div>
          <div className="mb-2">Tax</div>
          <div className="mb-2">Coupon / Promo Code</div>
          <div className="font-bold mb-2">Total: {calculateSubtotal()}</div>
          <Button variant="contained" onClick={() => console.log("checkout")}>
            Checkout
          </Button>
        </div>
      </div>
    </>
  );
};

export default Cart;

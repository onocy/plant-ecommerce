import React, { useEffect, useState } from "react";
import { usePlants } from "contexts/plantContext";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import Image from "next/image";
import { fetchCartForUser } from "utils/cart";
import { useUser } from "contexts/userContext";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const Cart = () => {
  const [cart, setCart] = useState(null);
  const { plants } = usePlants();

  const { user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      const userCart = await fetchCartForUser(user?.id);
      setCart(userCart);
    };

    fetchData();
  }, [user]);

  console.log(cart, "cart");

  const somePlants = plants?.slice(0, 3);

  return (
    <>
      <div className="flex gap-3 justify-between">
        <div className="flex-1">
          <div className="min-w-full bg-white">
            <div className="bg-white border-t border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Plant
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Category
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Price
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {somePlants?.map((plant, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-4 justify-start">
                          <Image
                            src={`/images/${plant.main_image}`}
                            width={100}
                            height={100}
                            alt={`Plant ${index + 1}`}
                          />
                          <div className="flex items-center">{plant.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        {plant.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        {plant.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        {plant.stock}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex gap-2 justify-end">
                          <button className="bg-red-500 text-white px-4 py-2 rounded">
                            Delete
                          </button>
                          <button className="bg-blue-500 text-white px-4 py-2 rounded">
                            Save
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="font-bold mb-2">Summary</div>
          <div className="mb-2">Subtotals</div>
          <div className="mb-2">Tax</div>
          <div className="mb-2">Coupon / Promo Code</div>
          <div className="font-bold mb-2">Total</div>
          <button className="bg-green-500 text-white px-4 py-2 rounded">
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;

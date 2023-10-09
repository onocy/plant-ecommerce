import React from "react";
import {
  Container,
  Paper,
  Grid,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { usePlants } from "contexts/plantContext";

const Cart = () => {
  const { plants } = usePlants();

  const somePlants = plants?.slice(0, 3);

  return (
    <>
      {/* <div>Test</div> */}
      {/* {somePlants?.map((plant, index) => {
        return (
          <div key={index}>
            <div>{plant.name}</div>
            <div>{plant.description}</div>
          </div>
        );
      })} */}

      <div className="flex gap-3 justify-between">
        <div className="flex-col flex-1 space-y-4">
          <div>
            <div className="flex justify-around gap-2">
              <Typography variant="h4" gutterBottom>
                Cart
              </Typography>
              <Typography variant="h6" gutterBottom>
                Quantity
              </Typography>
              <Typography variant="h6" gutterBottom>
                Item Name
              </Typography>
              <Typography variant="h6" gutterBottom>
                Price
              </Typography>
            </div>
          </div>
          <div className="bg-green-200">Item Row</div>
        </div>
        <div className="flex-col flex-1">
          <div className="div">Summary</div>
          <div className="div">Subtotals</div>
          <div className="div">Tax</div>
          <div className="div">Coupon / Promo Code</div>
          <div className="div">Total</div>
          <div className="div">Checkout</div>
        </div>
      </div>
    </>
  );
};

export default Cart;

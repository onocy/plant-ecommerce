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
      <div>Test</div>
      {somePlants?.map((plant, index) => {
        return (
          <div key={index}>
            <div>{plant.name}</div>
            <div>{plant.description}</div>
          </div>
        );
      })}
    </>
  );
};

export default Cart;

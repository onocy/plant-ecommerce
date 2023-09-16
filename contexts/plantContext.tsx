import React, { createContext, useContext, useState } from "react";

export const PlantContext = createContext(null);

export const usePlants = () => {
  return useContext(PlantContext);
};

export const PlantProvider = ({ children, initialPlants }) => {
  const [plants, setPlants] = useState(initialPlants);

  return (
    <PlantContext.Provider value={{ plants, setPlants }}>
      {children}
    </PlantContext.Provider>
  );
};

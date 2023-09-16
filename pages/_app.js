import "@/styles/globals.css";
import { PlantProvider } from "../contexts/plantContext";
import { CartProvider } from "../contexts/cartContext";

export default function App({ Component, pageProps }) {
  return (
    <CartProvider initialCart={pageProps.cart}>
      <PlantProvider initialPlants={pageProps.plants}>
        <Component {...pageProps} />
      </PlantProvider>
    </CartProvider>
  );
}

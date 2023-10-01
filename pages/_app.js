import "@/styles/globals.css";
import { PlantProvider } from "../contexts/plantContext";
import { CartProvider } from "../contexts/cartContext";
import { UserProvider } from "../contexts/userContext";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <CartProvider initialCart={pageProps.cart}>
        <PlantProvider initialPlants={pageProps.plants}>
          <div className="flex flex-col min-h-screen">
            <div className="flex-grow">
              <Navbar />
              <Component {...pageProps} />
            </div>
            <Footer />
          </div>
        </PlantProvider>
      </CartProvider>
    </UserProvider>
  );
}

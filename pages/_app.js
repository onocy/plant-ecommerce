import "@/styles/globals.css";
import { PlantProvider } from "../contexts/plantContext";
import { UserProvider } from "../contexts/userContext";
import { CartProvider } from "../contexts/cartContext";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { useRouter } from "next/router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const showNavbarAndFooter =
    router.pathname !== "/signIn" && router.pathname !== "/signUp";

  const showBackButton = router.pathname !== "/" && showNavbarAndFooter;

  return (
    <UserProvider>
      <PlantProvider initialPlants={pageProps.plants}>
        <CartProvider>
          <div data-theme="lemonade">
            <div className="flex flex-col min-h-screen">
              <div className="flex-grow overflow-auto">
                {showNavbarAndFooter && <Navbar />}
                {showBackButton && (
                  <button
                    className="btn btn-circle ml-5"
                    onClick={() => router.back()}
                  >
                    <ArrowBackIcon />
                  </button>
                )}
                <Component {...pageProps} />
              </div>
              {showNavbarAndFooter && <Footer />}
            </div>
          </div>
        </CartProvider>
      </PlantProvider>
    </UserProvider>
  );
}

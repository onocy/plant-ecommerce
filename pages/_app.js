import "@/styles/globals.css";
import { PlantProvider } from "../contexts/plantContext";
import { UserProvider } from "../contexts/userContext";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { useRouter } from "next/router";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#A8AD9A",
    },
    secondary: {
      main: "#ff4081",
    },
  },
  typography: {},
});

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const showNavbarAndFooter =
    router.pathname !== "/sign_in" && router.pathname !== "/sign_up";

  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <PlantProvider initialPlants={pageProps.plants}>
          <div className="flex flex-col min-h-screen">
            <div className="flex-grow overflow-auto">
              {showNavbarAndFooter && <Navbar />}
              <Component {...pageProps} />
            </div>
            {showNavbarAndFooter && <Footer />}
          </div>
        </PlantProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

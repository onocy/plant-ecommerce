import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../utils/supabase";
import { getUserCart } from "utils/cart";
import { useRouter } from "next/router";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [cartId, setCartId] = useState(null);

  async function fetchUser() {
    const { data: userData, error } = await supabase.auth.getUser();

    if (error) {
      console.error(error);
      return;
    }
    setUser(userData?.user ?? null);

    // If the user is found, fetch the associated cartId
    if (userData?.user) {
      const cartData = await getUserCart(userData.user.id);

      // if (cartError) {
      //   console.error(cartError);
      //   return;
      // }

      setCartId(cartData?.id ?? null);
    }
  }

  useEffect(() => {
    if (!user) {
      console.log("getting user");
      fetchUser();
    }
  }, [user]);

  async function signOut() {
    setUser(null);
    setCartId(null); // Clear the cartId on sign out
    const { error } = await supabase.auth.signOut();
    console.log(error, "error with signout");

    router.push("/signIn");
  }

  return (
    <UserContext.Provider value={{ user, setUser, signOut, cartId, setCartId }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

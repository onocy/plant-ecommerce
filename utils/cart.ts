import { supabase } from "../utils/supabase";
import stripe, { loadStripe } from "@stripe/stripe-js";

export const fetchCartData = async (cartId: any) => {
  const { data, error } = await supabase
    .from("cart")
    .select(
      `
      *,
      cart_items (
        *,
        plants (
          *,
          images (url),
          tags (tag)
        )
      )
    `
    )
    .eq("id", cartId)
    .single();

  if (error) throw error;
  return data;
};

export const handleAddToCart = async ({
  user,
  cartId,
  plantId,
  setIsLoading,
  router,
  updateCart,
  quantity = 1,
}) => {
  if (user?.id) {
    setIsLoading(true);
    await addItemToCart(cartId, user.id, plantId, quantity, updateCart).then(
      () => {
        setIsLoading(false);
      }
    );
  } else {
    router.push("/signIn");
  }
};

export const getUserCart = async (userId: string) => {
  const { data } = await supabase
    .from("cart")
    .select("id")
    .eq("user_id", userId)
    .single();
  return data;
};

export const addItemToCart = async (
  cartId: number,
  userId: string,
  plantId: number,
  quantity: number,
  updateCart: ({ cartId }) => void
) => {
  let trueCartId = cartId;

  // If no cartId is provided, check if one exists for the user, if not, create a new cart for the user
  if (!cartId) {
    const possibleCartId = await getUserCart(userId);

    if (possibleCartId) {
      trueCartId = possibleCartId.id;
    } else {
      const { data, error } = await supabase
        .from("cart")
        .upsert({ user_id: userId })
        .select();

      if (error) throw error;

      if (!error) {
        trueCartId = data[0].id;
      }
    }
  }

  const { data, error } = await supabase
    .from("cart_items")
    .upsert({
      cart_id: trueCartId,
      plant_id: plantId,
      quantity,
    })
    .select();

  if (error) throw error;

  if (!error) {
    updateCart({ cartId: trueCartId });
  }

  return data;
};

export const updateItemQuantity = async (
  itemId: number,
  newQuantity: number
) => {
  const { data, error } = await supabase
    .from("cart_items")
    .update({ quantity: newQuantity })
    .eq("id", itemId);

  if (error) throw error;
  return data;
};

export const deleteFromCart = async (
  itemId: number,
  cartId: number,
  updateCart: ({ cartId }) => void
) => {
  const { data, error } = await supabase
    .from("cart_items")
    .delete()
    .eq("id", itemId);

  if (error) throw error;

  if (!error) {
    updateCart({ cartId });
  }

  return data;
};

export const handleCreateCheckoutSession = async (cartId) => {
  try {
    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cartId }), // Send the cartId to your endpoint
    });

    const sessionData = await response.json();

    console.log(sessionData, "response");

    if (response.ok) {
      // Use Stripe.js to redirect to the checkout page
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
      );

      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionData.sessionId,
      });

      if (error) {
        console.error("Error redirecting to Stripe checkout:", error.message);
      }
    } else {
      throw new Error(sessionData.error || "Failed to create checkout session");
    }
  } catch (error) {
    console.error("Failed to initiate checkout:", error.message);
  }
};

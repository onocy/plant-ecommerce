import { useCart } from "contexts/cartContext";
import { supabase } from "../utils/supabase";

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

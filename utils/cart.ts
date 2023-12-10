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
}) => {
  if (user?.id) {
    setIsLoading(true);
    await addItemToCart(cartId, user.id, plantId, 1).then(() => {
      setIsLoading(false);
    });
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
  quantity: number
) => {
  let trueCartId = cartId;

  // If no cartId is provided, create a new cart for the user
  if (!cartId) {
    const { data, error } = await supabase
      .from("cart")
      .upsert({ user_id: userId })
      .select();

    if (error) throw error;

    if (!error) {
      trueCartId = data[0].id;
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

  return data;
};

export const removeItemFromCart = async (itemId: number) => {
  const { data, error } = await supabase
    .from("cart_items")
    .delete()
    .eq("id", itemId);

  if (error) throw error;
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

export const deleteFromCart = async (itemId: number) => {
  const { data, error } = await supabase
    .from("cart_items")
    .delete()
    .eq("id", itemId);

  if (error) throw error;
  return data;
};

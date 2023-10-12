import { supabase } from "../utils/supabase";

export const fetchCartForUser = async (userId: number) => {
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
    .eq("user_id", userId)
    .single();

  if (error) throw error;
  return data;
};

export const getUserCart = async (userId: string) => {
  const { data } = await supabase
    .from("carts")
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
    console.log(userId, "userId");
    const { data, error } = await supabase
      .from("cart")
      .insert({ user_id: parseInt(userId) })
      .single();

    if (error) throw error;

    console.log(data, "data");
    if (data) {
      trueCartId = (data as any).id;
    }
  }
  const { data, error } = await supabase
    .from("cart_items")
    .insert({
      cart_id: trueCartId,
      plant_id: plantId,
      quantity,
    })
    .single();

  if (error) throw error;

  console.log(data, "data 2");
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

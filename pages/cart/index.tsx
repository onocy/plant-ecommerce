import Cart from "components/Cart";
import { usePlants } from "contexts/plantContext";
import { supabase } from "../../utils/supabase";

const CartRoot = () => {
  const { plants } = usePlants();

  return (
    <>
      <Cart />
    </>
  );
};

export const getStaticProps = async () => {
  const { data: plants } = await supabase.from("plants").select("*");
  const { data: cart } = await supabase.from("cart").select("*");

  return {
    props: {
      plants,
      cart,
    },
  };
};

export default CartRoot;

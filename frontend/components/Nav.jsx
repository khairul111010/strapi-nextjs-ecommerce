import { FiShoppingCart } from "react-icons/fi";
import Link from "next/link";
import { NavStyles, NavItems } from "@/styles/components/nav/NavStyles";
import Cart from "./Cart";
import { useStateContext } from "@/lib/context";

import { AnimatePresence, motion } from "framer-motion";
const Nav = () => {
  const { showCart, setShowCart, totalQty } = useStateContext();
  return (
    <NavStyles>
      <Link href={"/"}>Clothes.</Link>
      <NavItems>
        <div onClick={() => setShowCart(true)}>
          {totalQty > 0 && (
            <motion.span animate={{ scale: 1 }} initial={{ scale: 0 }}>
              {totalQty}
            </motion.span>
          )}
          <FiShoppingCart />
          <h3>Carts</h3>
        </div>
      </NavItems>
      <AnimatePresence>{showCart && <Cart />}</AnimatePresence>
    </NavStyles>
  );
};

export default Nav;

import { useStateContext } from "@/lib/context";
import getStripe from "@/lib/getStripe";
import {
  CartStyles,
  CartBgStyles,
  Card,
  CardInfo,
  EmptyStyle,
  Checkout,
  Cards,
} from "@/styles/components/cart/CartStyles";

import { Quantity } from "@/styles/product/ProductDetails";

import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";

import { BsCart3 } from "react-icons/bs";

const card = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 },
};
const cards = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { delayChildren: 0.5, staggerChildren: 0.1 },
  },
};

const Cart = () => {
  const { cartItems, setShowCart, onAdd, onRemove, totalPrice } =
    useStateContext();

  const handleCheckout = async () => {
    const stripe = await getStripe();
    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cartItems),
    });
    const data = await response.json();
    await stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <CartStyles
      key="cart"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowCart(false)}
    >
      <CartBgStyles
        animate={{ x: "0%" }}
        initial={{ x: "50%" }}
        exit={{ x: "50%" }}
        transition={{ type: "tween" }}
        onClick={(e) => e.stopPropagation()}
      >
        {cartItems.length < 1 && (
          <EmptyStyle
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.2 }}
          >
            <h3>You have more shopping to do 😊</h3>
            <BsCart3 />
          </EmptyStyle>
        )}
        <Cards layout variants={cards} animate="show" initial="hidden">
          {cartItems.length >= 1 &&
            cartItems.map((item) => {
              return (
                <Card
                  layout
                  variants={card}
                  animate="show"
                  initial="hidden"
                  key={item.slug}
                >
                  <img
                    src={
                      process.env.NEXT_PUBLIC_BACKEND_URL +
                      item.image.data.attributes.url
                    }
                    alt=""
                  />
                  <CardInfo>
                    <h3>{item.title}</h3>
                    <h3>{item.price}</h3>
                    <Quantity>
                      <span>Quantity</span>
                      <button>
                        <AiFillPlusCircle onClick={() => onAdd(item, 1)} />
                      </button>
                      <p>{item.quantity}</p>
                      <button>
                        <AiFillMinusCircle onClick={() => onRemove(item, 1)} />
                      </button>
                    </Quantity>
                  </CardInfo>
                </Card>
              );
            })}
        </Cards>
        {cartItems.length >= 1 && (
          <Checkout layout>
            <h3>Subtotal: {totalPrice}$</h3>
            <button onClick={handleCheckout}>Purchase</button>
          </Checkout>
        )}
      </CartBgStyles>
    </CartStyles>
  );
};

export default Cart;

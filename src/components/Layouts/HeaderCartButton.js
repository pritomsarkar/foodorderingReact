import React, { useContext, useState, useEffect } from "react";

import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const cartContext = useContext(CartContext);
  const { items } = cartContext;
  const [btnisHighlighted, setBtnIsHighlighted] = useState(false);

  const numerOfCartItem = items.reduce((currItem, item) => {
    return currItem + item.amount;
  }, 0);
  const btnClasses = `${classes.button} ${
    btnisHighlighted ? classes.bump : ""
  }`;
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);
    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numerOfCartItem}</span>
    </button>
  );
};

export default HeaderCartButton;

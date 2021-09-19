import React, { useReducer } from "react";

import CartContext from "./cart-context";

const ACTIONS = {
  ADD: "add",
  REMOVE: "remove",
};

const defaulCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD: {
      const updatedTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );
      const existingCartItem = state.items[existingCartItemIndex];
      let updatedCart;
      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.item.amount,
        };
        updatedCart = [...state.items];
        updatedCart[existingCartItemIndex] = updatedItem;
      } else {
        updatedCart = state.items.concat(action.item);
      }

      return {
        items: updatedCart,
        totalAmount: updatedTotalAmount,
      };
    }
    case ACTIONS.REMOVE: {
      const removedItemIndex = state.items.findIndex(
        (item) => item.id === action.id
      );
      const existsingItem = state.items[removedItemIndex];
      const updatedTotalAmount = state.totalAmount - existsingItem.price;
      let updatedItems;
      if (existsingItem.amount === 1) {
        updatedItems = state.items.filter((item) => item.id !== action.id);
      } else {
        const updatedItem = {
          ...existsingItem,
          amount: existsingItem.amount - 1,
        };
        updatedItems = [...state.items];
        updatedItems[removedItemIndex] = updatedItem;
      }
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }
    default:
      return defaulCartState;
  }
};

const CartProvider = (props) => {
  const [cartState, dispatchCart] = useReducer(cartReducer, defaulCartState);

  const addItemHandler = (item) => {
    dispatchCart({ type: ACTIONS.ADD, item: item });
  };

  const removeItemHandler = (id) => {
    dispatchCart({ type: ACTIONS.REMOVE, id: id });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;

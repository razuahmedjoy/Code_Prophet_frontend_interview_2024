import React, { createContext, useContext, useReducer } from "react";

// Initial state for the cart
const initialState = {
  cartItems: [], // Array of items in the cart
};

// Cart reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );

      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item._id === action.payload._id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      }

      return {
        ...state,
        cartItems: [...state.cartItems, { ...action.payload }],
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item._id !== action.payload),
      };

    case "UPDATE_QUANTITY":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item._id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        ),
      };

    case "CLEAR_CART":
      return initialState;

    default:
      return state;
  }
};

// Create the context
const CartContext = createContext();

// Provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ cartState: state, cartDispatch: dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext
export const useCart = () => useContext(CartContext);

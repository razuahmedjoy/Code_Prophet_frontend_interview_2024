import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contextApi/cartContext';

function CartPage() {
    // Sample cart data
    const { cartDispatch,cartState } = useCart();
    const { cartItems } = cartState;
    
    const DELIVERY_CHARGE = 5;

    // Calculate total price
    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const handleRemoveItem = (id) => {
        cartDispatch({ type: "REMOVE_FROM_CART", payload: id });
        };

    const handleQuantityChange = (id, delta) => {
        // setCartItems(
        //     cartItems.map((item) =>
        //         item._id === id
        //             ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        //             : item
        //     )
        // );
        console.log(id,delta)
        cartDispatch({
            type: "UPDATE_QUANTITY",
            payload: { id: id, quantity: delta },
          });
    };

    console.log(cartItems)

    return (
        <div className="container mx-auto p-5 bg-white md:mt-8 rounded-lg">
            <h1 className="text-3xl font-bold mb-6 text-center">Cart</h1>

            {cartItems?.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Cart Items */}
                        <div className="md:col-span-2">
                            {cartItems.map((item) => (
                                <div
                                    key={item._id}
                                    className="flex items-center justify-between border-b py-4"
                                >
                                    {/* Item Info */}
                                    <div className="flex items-center space-x-4">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                        <div>
                                            <h2 className="font-semibold text-lg">{item.name}</h2>
                                            <p className="text-gray-500">${item.price.toFixed(2)} each</p>
                                        </div>
                                    </div>

                                    {/* Quantity and Subtotal */}
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => handleQuantityChange(item._id, -1)}
                                                className="px-2 py-1 bg-gray-200 rounded hover:bg-red-300 hover:text-white"
                                            >
                                                -
                                            </button>
                                            <span className="text-center w-8">{item.quantity}</span>
                                            <button
                                                onClick={() => handleQuantityChange(item._id, 1)}
                                                className="px-2 py-1 bg-gray-200 rounded hover:bg-cyan-300 hover:text-white"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <p className="text-lg font-semibold">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>

                                    {/* Remove Button */}
                                    <button
                                        onClick={() => handleRemoveItem(item._id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        X
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="p-4 bg-gray-100 rounded shadow-lg">
                            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                            <div className="flex justify-between border-b pb-2">
                                <p>Subtotal</p>
                                <p>${totalPrice.toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between border-b py-2">
                                <p>Delivery Charge</p>
                                <p>${DELIVERY_CHARGE.toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between text-lg font-bold mt-4">
                                <p>Total</p>
                                <p>${(totalPrice + DELIVERY_CHARGE).toFixed(2)}</p>
                            </div>

                            <Link to={'/checkout'}>
                                <button className="mt-6 w-full bg-teal-600 text-white py-2 rounded hover:bg-cyan-500">
                                    Proceed to Checkout

                                </button>
                            </Link>
                        </div>
                    </div>
                </>
            ) : (
                <div className="text-center">
                    <h2 className="text-xl font-semibold">Your cart is empty!</h2>
                    <p className="text-gray-500">Add some items to your cart to see them here.</p>
                </div>
            )}
        </div>
    );
}

export default CartPage;

import React from 'react';
import { useForm } from 'react-hook-form';
import { useCart } from '../contextApi/cartContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function CheckoutPage() {
  const DELIVERY_CHARGE = 5;

  // Sample cart data
  const { cartDispatch,cartState } = useCart();
  const { cartItems } = cartState;
  const navigate = useNavigate();
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log('Order Placed:', data);
    const orderData = {
      ...data,
      cartItems,
      total:(totalPrice + DELIVERY_CHARGE).toFixed(2)
    }
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/orders`,orderData)

    // 

    toast.success("Order Placced")
    // redirect to orders page
    navigate("/orders");

  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Form Section */}
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">User Details</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Name</label>
              <input
                type="text"
                {...register('name', { required: 'Name is required' })}
                className={`w-full p-2 border rounded ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Address</label>
              <input
                type="text"
                {...register('address', { required: 'Address is required' })}
                className={`w-full p-2 border rounded ${
                  errors.address ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
              <input
                type="tel"
                {...register('phone', {
                  required: 'Phone number is required',
                  pattern: {
                    value: /^[0-9]{11}$/,
                    message: 'Phone number must be 11 digits',
                  },
                })}
                className={`w-full p-2 border rounded ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-2 rounded hover:bg-cyan-500"
            >
              Place Order
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="p-4 bg-gray-100 rounded shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <ul className="space-y-2">
            {cartItems.map((item) => (
              <li key={item._id} className="flex justify-between">
                <p>
                  {item.name} x {item.quantity}
                </p>
                <p>${(item.price * item.quantity).toFixed(2)}</p>
              </li>
            ))}
          </ul>
          <div className="flex justify-between border-t pt-4 mt-4">
            <p>Delivery Charge</p>
            <p>${DELIVERY_CHARGE.toFixed(2)}</p>
          </div>
          <div className="flex justify-between text-lg font-bold border-t pt-4 mt-4">
            <p>Total</p>
            <p>${(totalPrice + DELIVERY_CHARGE).toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;

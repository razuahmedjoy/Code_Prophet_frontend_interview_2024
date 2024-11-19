import axios from 'axios';
import React, { useState, useEffect } from 'react';

function OrderManage() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
      const fetchOrders = async ()=>{
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/orders`);
        setOrders(res.data)
      }
      fetchOrders()
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>

      {orders.length > 0 ? (
        <div className="overflow-x-auto">
          {/* Orders Table */}
          <table className="min-w-full bg-white shadow-lg rounded-lg">
            <thead className="bg-teal-800 text-white">
              <tr>
                <th className="text-left p-4 font-semibold">Order ID</th>
                <th className="text-left p-4 font-semibold">Date</th>
                <th className="text-left p-4 font-semibold">Status</th>
                <th className="text-right p-4 font-semibold">Total</th>
                <th className="text-center p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b hover:bg-gray-100 transition-colors"
                >
                  <td className="p-4">{order._id}</td>
                  <td className="p-4">{new Date(order.created_at).toDateString()}</td>
                  <td
                    className={`p-4 ${
                      order.status === 'Delivered'
                        ? 'text-green-600'
                        : 'text-yellow-600'
                    }`}
                  >
                    {order.status}
                  </td>
                  <td className="p-4 text-right">${order.total.toFixed(2)}</td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-blue-500"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600">No orders found.</p>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2">
            <h2 className="text-xl font-bold mb-4">Order Details</h2>
            <p className="text-gray-700">Order ID: {selectedOrder._id}</p>
            <p className="text-gray-700">Date: {new Date(selectedOrder.created_at).toDateString()}</p>
            <p className="text-gray-700 mb-4">
              Status:{' '}
              <span
                className={`${
                  selectedOrder.status === 'Delivered'
                    ? 'text-green-600'
                    : 'text-yellow-600'
                }`}
              >
                {selectedOrder.status}
              </span>
            </p>
            <ul className="space-y-2 mb-4">
              {selectedOrder.products.map((item, index) => (
                <li key={index} className="flex justify-between border-b pb-2">
                  <p>
                    {item.name} x {item.quantity}
                  </p>
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                </li>
              ))}
            </ul>
            <p className="text-lg font-bold text-gray-800">
              Total: ${selectedOrder.total.toFixed(2)}
            </p>
            <button
              onClick={() => setSelectedOrder(null)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-400"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderManage;

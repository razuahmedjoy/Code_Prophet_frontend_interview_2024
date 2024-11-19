import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    image: "",
  });

  const apiUrl = "http://localhost:5000/products";

  // Fetch products
  useEffect(() => {
    axios
      .get(apiUrl)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, [apiUrl]);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Add/Edit form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEdit) {
      // Edit Product
      axios
        .put(`${apiUrl}/${editProductId}`, productData)
        .then((res) => {
          setProducts((prev) =>
            prev.map((product) =>
              product._id === editProductId ? res.data : product
            )
          );
          resetForm();
        })
        .catch((err) => console.error(err));
    } else {
      // Add New Product
      axios
        .post(apiUrl, productData)
        .then((res) => {
          setProducts((prev) => [...prev, res.data]);
          resetForm();
        })
        .catch((err) => console.error(err));
    }
  };

  // Handle Delete Product
  const handleDelete = (id) => {
    axios
      .delete(`${apiUrl}/${id}`)
      .then(() => {
        setProducts((prev) => prev.filter((product) => product._id !== id));
      })
      .catch((err) => console.error(err));
  };

  // Open modal for editing
  const handleEdit = (product) => {
    setIsEdit(true);
    setEditProductId(product._id);
    setProductData({
      name: product.name,
      price: product.price,
      category: product.category,
      stock: product.stock,
      image: product.image,
    });
    setIsModalOpen(true);
  };

  // Reset modal and form state
  const resetForm = () => {
    setIsModalOpen(false);
    setIsEdit(false);
    setEditProductId(null);
    setProductData({ name: "", price: "", category: "", stock: "", image: "" });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-teal-700">Product Management</h1>
        <button
          className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
          onClick={() => setIsModalOpen(true)}
        >
          Add New Product
        </button>
      </div>

      {/* Product Table */}
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead>
          <tr className="bg-teal-100">
            <th className="text-left px-4 py-2 text-teal-800">Name</th>
            <th className="text-left px-4 py-2 text-teal-800">Price</th>
            <th className="text-left px-4 py-2 text-teal-800">Category</th>
            <th className="text-left px-4 py-2 text-teal-800">Stock</th>
            <th className="text-left px-4 py-2 text-teal-800">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="border-t">
              <td className="px-4 py-2">{product.name}</td>
              <td className="px-4 py-2">${product.price}</td>
              <td className="px-4 py-2">{product.category}</td>
              <td className="px-4 py-2">{product.stock}</td>
              <td className="px-4 py-2">
                <button
                  className="text-cyan-600 hover:text-cyan-800 mr-2"
                  onClick={() => handleEdit(product)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add/Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold text-teal-700 mb-4">
              {isEdit ? "Edit Product" : "Add New Product"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={productData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded focus:outline-teal-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Price</label>
                <input
                  type="number"
                  name="price"
                  value={productData.price}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded focus:outline-teal-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Category</label>
                <input
                  type="text"
                  name="category"
                  value={productData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded focus:outline-teal-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={productData.stock}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded focus:outline-teal-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={productData.image}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded focus:outline-teal-500"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
                >
                  {isEdit ? "Save Changes" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;

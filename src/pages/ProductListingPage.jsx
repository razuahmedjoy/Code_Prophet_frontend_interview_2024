import React, { useState, useEffect } from 'react';
import { FunnelIcon } from '@heroicons/react/24/outline'; // Importing the filter icon from Heroicons
import axios from 'axios';
import { useCart } from '../contextApi/cartContext';
import toast from 'react-hot-toast';

function ProductListingPage() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Toggle sidebar state

    const { cartDispatch,cartState } = useCart();
    const { cartItems } = cartState;



    useEffect(() => {
        const fetchProducts = async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/products`)
            if (res?.data?.length > 0) {
                setProducts(res?.data)
                setFilteredProducts(res?.data);

            }
        }
        fetchProducts()

    }, []);

    useEffect(() => {

        const uniqueCategories = ['All', ...new Set(products?.map((product) => product.category))];
        setCategories(uniqueCategories);
    }, [products])

    const handleSearch = (e) => {
        setSearch(e.target.value);
        filterProducts(e.target.value, selectedCategory);
    };

    const handleCategoryFilter = (category) => {
        setSelectedCategory(category);
        filterProducts(search, category);
    };

    const filterProducts = (searchTerm, category) => {
        let filtered = products;

        if (category !== 'All') {
            filtered = filtered.filter((product) => product.category === category);
        }

        if (searchTerm) {
            filtered = filtered.filter((product) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredProducts(filtered);
    };

    const addToCart = (product) => {

       
        cartDispatch({
            type: "ADD_TO_CART",
            payload: {
               
                quantity: 1, 
                ...product,
            },
        });


        toast.success(`${product.name} added to cart!`);

    }

    return (
        <div className="flex overflow-hidden">
            {/* Sidebar (Responsive) */}
            <aside
                className={`fixed z-10 bg-white border-r w-56 p-4 h-screen transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:translate-x-0 md:relative md:w-1/4`}
            >
                <h2 className="text-xl font-semibold mb-4">Filter by Category</h2>
                <ul className="space-y-2">
                    {categories.map((category) => (
                        <li
                            key={category}
                            className={`cursor-pointer p-2 rounded ${selectedCategory === category ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
                                }`}
                            onClick={() => {
                                handleCategoryFilter(category);
                                setIsSidebarOpen(false); // Close sidebar on mobile after selection
                            }}
                        >
                            {category}
                        </li>
                    ))}
                </ul>
            </aside>



            {/* Main Content */}
            <main className="flex-grow p-4 ml-0">
                {/* Search Bar */}
                <div className="mb-6 flex gap-3">

                    <input
                        type="text"
                        placeholder="Search for products..."
                        value={search}
                        onChange={handleSearch}
                        className="w-full p-2 border rounded shadow-sm border-teal-100 outline-teal-200"
                    />
                    <button
                        className=" md:hidden z-20 bg-blue-600 text-white p-2 rounded-full shadow-lg"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        <FunnelIcon className="h-6 w-6" />
                    </button>
                </div>

                {/* Product Cards */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {filteredProducts.map((product) => (
                        <div
                            key={product._id}
                            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow bg-white"
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-36 border border-solid rounded-md object-cover mb-4"
                            />
                            <h3 className="text-base font-medium">{product.name}</h3>
                            <p className="text-teal-600 text-lg font-bold">${product.price}</p>
                            <button onClick={() => addToCart(product)} className="mt-4 w-full py-1 bg-teal-600 text-white rounded-lg hover:bg-cyan-500">
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default ProductListingPage;

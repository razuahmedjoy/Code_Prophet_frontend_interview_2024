import React from 'react';
import HeroImage from '../assets/images/hero.png'
import { Link } from 'react-router-dom';
function LandingPage() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between min-h-screen px-8 container mx-auto w-full">
      {/* Left Section */}

   
      <div className="md:w-1/2 text-center md:text-left space-y-6">
        <h1 className="text-4xl font-bold text-gray-800 leading-tight">
          Fresh Groceries Delivered <br /> Right To Your Doorstep
        </h1>
        <p className="text-lg text-gray-600">
          Shop from a wide range of products and enjoy fast, hassle-free delivery.
        </p>
        <button className="px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg shadow-lg hover:bg-cyan-500">
            <Link to={'/products'}>
          Start Shopping
            </Link>
        </button>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
        <img
         
          src={HeroImage}
          alt="Groceries"
          className="w-full"
        />
      </div>

    
    </div>
  );
}

export default LandingPage;

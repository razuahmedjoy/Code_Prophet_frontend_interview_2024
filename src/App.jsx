import React from 'react';
import { Outlet } from 'react-router-dom';
import NavbarComponent from './components/NavbarComponent.jsx'
import "./App.css"
const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavbarComponent />
      <main className="w-full min-h-screen">

      <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-teal-300 to-cyan-300 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <Outlet /> {/* This renders child routes */}


       
      </main>
      <footer className="bg-gray-800 text-white py-4 text-center">
        © 2024 GroceryApp. All rights reserved.
      </footer>
    </div>
  );
}

export default App;

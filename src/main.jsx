import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router.jsx'
import { CartProvider } from './contextApi/cartContext.jsx'
import { Toaster } from "react-hot-toast";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>

      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
    </CartProvider>
  </StrictMode>
)

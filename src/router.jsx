import { createBrowserRouter } from "react-router-dom";
import App from './App.jsx'
import LandingPage from "./pages/LandingPage.jsx";
import ProductListingPage from "./pages/ProductListingPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import OrderPage from "./pages/OrderPage.jsx";
import AdminLayout from "./AdminLayout.jsx";
import Dashboard from "./pages/Admin/Dashboard.jsx";
import ProductManage from "./pages/Admin/ProductManage.jsx";
import OrderManage from "./pages/Admin/OrdersManage.jsx";
const router = createBrowserRouter([
    {
      path: '',
      element: <App />,
      children: [
        { index: true, element: <LandingPage /> }, // Default route
        { path:'products', element:<ProductListingPage />},
        { path:'cart', element:<CartPage />},
        { path:'checkout', element:<CheckoutPage />},
        { path:'orders', element:<OrderPage />},
    
      ],
    },
    {
      path: '/admin',
      element: <AdminLayout />,
      children: [
        {path:'dashboard',element:<Dashboard/>},
        {path:'products',element:<ProductManage/>},
        {path:'orders',element:<OrderManage/>},
 
    
    
      ],
    },
  ]);


export default router
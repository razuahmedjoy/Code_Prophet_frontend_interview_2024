import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
  Collapse,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../contextApi/cartContext";

 
const NavbarComponent = () => {
  const [openNav, setOpenNav] = React.useState(false);

  const {cartState} = useCart()
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);
 
  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to="/" className="flex items-center">
          Home
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to="/products" className="flex items-center">
          Products
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to="/orders" className="flex items-center">
          Orders
        </Link>
      </Typography>
 
    </ul>
  );
 
  return (
    <div className="max-h-[768px] w-full">
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900 w-full container mx-auto">
          <Link
            as="a"
            href="/"
            className="mr-4 cursor-pointer py-1.5 font-bold capitalize text-xl"
          >
            Grocery Shop
          </Link>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <div className="flex items-center gap-x-1">
              <Button
                variant="text"
                size="sm"
                className="hidden lg:inline-block"
              >
                <Link to={'/admin/dashboard'}>
                <span>Admin Dashboard</span>
                </Link>
              </Button>
              <Button
              
                size="sm"
                className="hidden lg:inline-block bg-teal-600 hover:bg-cyan-500"
              >
                <Link to="/cart" className="flex gap-2 justify-center items-center">
                <FaShoppingCart />
                  Cart ({cartState?.cartItems?.length})</Link>
              </Button>
            </div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>
          {navList}
          <div className="flex items-center gap-x-1">
          <Button
                variant="text"
                size="sm"
                className="hidden lg:inline-block"
              >
                <Link to={'/admin/dashboard'}>
                <span>Admin Dashboard</span>
                </Link>
              </Button>
              <Button
              
                size="sm"
                className="hidden lg:inline-block bg-teal-600 hover:bg-cyan-500"
              >
                <Link to="/cart" className="flex gap-2 justify-center items-center">
                <FaShoppingCart />
                  Cart ({cartState?.cartItems?.length})</Link>
              </Button>
          </div>
        </Collapse>
      </Navbar>
  
    </div>
  );
}



export default NavbarComponent;
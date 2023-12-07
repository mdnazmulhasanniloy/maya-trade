import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import AllProducts from "../Pages/AllProducts/AllProducts";
import Contact from "../Pages/Contact/Contact";
import Error from "./../Pages/Error/Error";
import Cart from "../Pages/Cart/Cart";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Profile from "../Pages/Profile/Profile";
import UserRegister from "./../Pages/Register/UserRegister";
import Dashboard from "../Layout/DashboardLayout/Dashboard";
import Orders from "./../Pages/Dashboard/Admin/Orders/Orders";
import Products from "../Pages/Dashboard/Admin/Products/Products";
import Category from "../Pages/Dashboard/Admin/Category/Category";
import PaymentSuccess from "../Pages/Dashboard/Buyers/PaymentSuccess/PaymentSuccess";
import MyOrders from "./../Pages/Dashboard/Buyers/MyOrders/MyOrders";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/allProducts",
        element: <AllProducts />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/user-register",
        element: <UserRegister />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/payment/success/:tranId",
        element: <PaymentSuccess />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "dashboard/products-list",
        element: <Products />,
      },
      {
        path: "dashboard/category",
        element: <Category />,
      },
      {
        path: "dashboard/orders",
        element: <Orders />,
      },
      {
        path: "dashboard/my-orders",
        element: <MyOrders />,
      },
    ],
  },
]);

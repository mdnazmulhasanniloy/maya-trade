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
import EditProfile from "../Pages/Profile/EditProfile/EditProfile";
import UserRegister from "./../Pages/Register/UserRegister";
import Dashboard from "../Layout/DashboardLayout/Dashboard";
import Orders from "./../Pages/Dashboard/Admin/Orders/Orders";
import ProductList from "./../Pages/Dashboard/Admin/ProductList/ProductList";
import Products from "../Pages/Dashboard/Admin/Products/Products";
import Category from "../Pages/Dashboard/Admin/Category/Category";

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
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard",
        element: <ProductList />,
      },
      {
        path: "dashboard/products-list",
        element: <ProductList />,
      },
      {
        path: "dashboard/category",
        element: <Category />,
      },
      {
        path: "dashboard/add-product",
        element: <Products />,
      },
      {
        path: "dashboard/orders",
        element: <Orders />,
      },
    ],
  },
]);

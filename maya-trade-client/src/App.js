import React, { useEffect } from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { Router } from "./Router/Router";
import { Toaster } from "react-hot-toast";
import { onAuthStateChanged } from "firebase/auth";
import auth from "./Firebase/Firebase.config";
import { useDispatch } from "react-redux";
import { getUser, toggleLoading } from "./features/authSlice/authSlice";
import { Cloudinary } from "@cloudinary/url-gen";

function App() {
  const cld = new Cloudinary({ cloud: { cloudName: "dvtled2nd" } });
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(getUser(user?.email));
      } else {
        dispatch(toggleLoading());
      }
    });
  }, [dispatch]);
  return (
    <div className="max-w-[1440px] mx-auto">
      <RouterProvider router={Router}></RouterProvider>
      <Toaster toastOptions={{ className: "z-[99999]" }} />
    </div>
  );
}

export default App;

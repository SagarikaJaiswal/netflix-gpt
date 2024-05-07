import React from "react";
import Login from "./Login";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Browse from "./Browse";

import Error from "./Error";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/error",
    element: <Error />,
  },
]);

const Body = () => {
  
  
  return (
    <RouterProvider router={appRouter}>
      <div>
        <Login />
      </div>
    </RouterProvider>
  );
};

export default Body;

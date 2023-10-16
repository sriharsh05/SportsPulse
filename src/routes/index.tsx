import { createBrowserRouter } from "react-router-dom";
import AccountLayout from "../layouts/account";
import Home from "../pages/home";
import Signin from "../pages/signin";
import Signup from "../pages/signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AccountLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/signin", element: <Signin /> },
      { path: "/signup", element: <Signup />},
    ],
  },
]);

export default router;
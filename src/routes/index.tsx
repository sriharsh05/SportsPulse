import { createBrowserRouter } from "react-router-dom";
import AccountLayout from "../layouts/account";
import Home from "../pages/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AccountLayout />,
    children: [
      { path: "/", element: <Home /> },
    ],
  },
]);

export default router;
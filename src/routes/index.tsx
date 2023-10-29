import { createBrowserRouter } from "react-router-dom";
import AccountLayout from "../layouts/account";
import Home from "../pages/home";
import Signin from "../pages/signin";
import Signup from "../pages/signup";
import Logout from "../pages/logout";
import ArticlePage from "../pages/articles";
import PreferencesPage from "../pages/preferences";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AccountLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          { path: "/articles/:id", element: <ArticlePage /> },
          {
            path: "/preferences",
            element: (
              <ProtectedRoute>
                <PreferencesPage />
              </ProtectedRoute>
            ),
          },
        ],
      },
      { path: "/signin", element: <Signin /> },
      { path: "/signup", element: <Signup /> },
      { path: "/logout", element: <Logout /> },
    ],
  },
]);

export default router;

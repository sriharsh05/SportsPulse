import { createBrowserRouter } from "react-router-dom";
import AccountLayout from "../layouts/account";
import Home from "../pages/home";
import Signin from "../pages/signin";
import Signup from "../pages/signup";
import Logout from "../pages/logout";
import ArticlePage from "../pages/articles";
import PreferencesPage from "../pages/preferences";
import ProtectedRoute from "./ProtectedRoute";
import Notfound from "../pages/Notfound";
import FavoritesPage from "../pages/favorites";
import UpdatePasswordModal from "../pages/UpdatePassword/UpdatePasswordModal";

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
          { path: "/favorites/:id", element: <FavoritesPage /> },
          {
            path: "/preferences",
            element: (
              <ProtectedRoute>
                <PreferencesPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "/password",
            element: (
              <ProtectedRoute>
                <UpdatePasswordModal />
              </ProtectedRoute>
            ),
          },
        ],
      },
      { path: "/signin", element: <Signin /> },
      { path: "/signup", element: <Signup /> },
      { path: "/logout", element: <Logout /> },
      {
        path: "*",
        element: <Notfound />,
      },
    ],
  },
]);

export default router;

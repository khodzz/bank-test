import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Transactions from "../pages/Transactions";
import Send from "../pages/Send";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "transactions",
        element: <Transactions />,
      },
      {
        path: "send",
        element: <Send />,
      },
    ],
  },
]);

export default router;

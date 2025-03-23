import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage";
import ExplorePage from "../pages/ExplorePage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "",
        element: <HomePage/>,
      },
      {
        path : "explore",
        element : <ExplorePage/>
      }
    ],
  },
]);
export default router;

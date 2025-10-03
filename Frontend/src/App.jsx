import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import { First } from "./first";
import LoginForm from "./components/LoginForm.jsx";
import RegisterForm from "./components/RegisterForm.jsx";
import  UPdataprofile from "./Userprofile.jsx"
import MyProfile from "./MyProfile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <First />,
    children: [
      { index: true, element: <RegisterForm /> },
      { path: "LoginForm", element: <LoginForm /> },
      {
        path: "Home",
        element: <Home />,
      },

        {
        path: "UPdataprofile",
        element: <UPdataprofile />,
      },
            {
        path: "MyProfile",
        element: <MyProfile />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import {
  // BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import axios from "axios";
import config from "./config";
import RecipeDetails from "./components/RecipeDetails/RecipeDetails";
import MyRecipes from "./components/MyRecipes/MyRecipes";
function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    async function verifyToken() {
      try {
        if (localStorage.getItem("token")) {
          const token = localStorage.getItem("token");
          const baseUrl = config();
          const response = await axios.post(
            `${baseUrl}/api/user/login`,
            { email: "", password: "" },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          // console.log(response);
          if (response.status === 200) {
            const tempUser = response.data.data.user;
            localStorage.setItem("user", JSON.stringify(tempUser));
            // localStorage.setItem("token", response.data.token);
            setUser(tempUser);
            console.log("redirecting");
            if (path === "/login" || path === "/register") navigate("/");
          }
        }
      } catch (e) {}
    }
    verifyToken();
  }, []);

  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/recipe/:recipeName" element={<RecipeDetails />} />
        <Route path="/my-recipes/" element={<MyRecipes />} />

        <Route path="/login" exact element={<Login setUser={setUser} />} />
        <Route
          path="/register"
          exact
          element={<Register setUser={setUser} />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

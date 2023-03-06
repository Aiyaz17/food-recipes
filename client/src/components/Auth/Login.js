import { Card, Typography, Box, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import config from "../../config";
import axios from "axios";
import img from "../../assets/3d_foods/food_4.png";

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setError("");
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const baseUrl = await config();
    try {
      const response = await axios.post(`${baseUrl}/api/user/login`, data);

      console.log(response);
      if (response.status === 200) {
        const user = response.data.data.user;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", response.data.token);
        setUser(user);
        console.log("redirecting");
        navigate("/");
      }
    } catch (e) {
      setError(e.response.data.message);
    }
  };

  return (
    <Box
      className="auth"
      sx={{
        display: "flex",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
        mt: 9,
      }}
    >
      <Card
        className="card-container"
        sx={{
          p: 5,
        }}
      >
        <Box className="form-container">
          <Typography
            className="primary-highlight"
            variant="h3"
            sx={{ width: "fit-content", mb: 4 }}
          >
            Sign In{" "}
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              label="Email"
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              label="Password"
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
            />
            {error !== "" && (
              <Typography variant="subtitle" sx={{ color: "red" }}>
                {error}
              </Typography>
            )}{" "}
            <Button type="submit" className="button">
              Submit
            </Button>
          </form>

          <Typography sx={{ mt: 3 }}>
            Not created an account yet?{" "}
            <Link className="primary-highlight" to="/register">
              Register Now
            </Link>
          </Typography>
        </Box>
        <img className="signin-img" src={img} alt="img" />
      </Card>
    </Box>
  );
};

export default Login;

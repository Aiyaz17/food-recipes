import { Card, Typography, Box, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../config";
import img from "../../assets/3d_foods/food_2.png";

const Register = ({ setUser }) => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(data);
    if (data.password !== data.cpassword) {
      setError("Both Passwords doesn't match.");
      return;
    }
    try {
      const baseUrl = await config();
      const response = await axios.post(`${baseUrl}/api/user/register`, data);
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
        mt: 12,
      }}
    >
      <Card
        sx={{
          p: 5,
          minWidth: "500px",
          display: "flex",
          gap: "30px",
        }}
      >
        <Box>
          <Typography
            className="primary-highlight"
            variant="h3"
            sx={{ width: "fit-content", mb: 4 }}
          >
            Create an account{" "}
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              label="Name"
              type="text"
              name="name"
              required
              onChange={handleChange}
              value={data.name}
            />
            <TextField
              variant="outlined"
              label="Email"
              type="email"
              name="email"
              required
              onChange={handleChange}
              value={data.email}
            />
            <Box sx={{ display: "flex", gap: "20px" }}>
              <TextField
                variant="outlined"
                label="Password"
                type="password"
                name="password"
                required
                onChange={handleChange}
                sx={{ flex: 1 }}
                value={data.password}
              />
              <TextField
                variant="outlined"
                label="Confirm password"
                type="password"
                name="cpassword"
                required
                onChange={handleChange}
                sx={{ flex: 1 }}
                value={data.cpassword}
              />
            </Box>
            {error !== "" && (
              <Typography variant="subtitle" sx={{ color: "red" }}>
                {error}
              </Typography>
            )}
            <Button type="submit" className="button">
              Register
            </Button>
          </form>

          <Typography sx={{ mt: 3 }}>
            Already have a account?{" "}
            <Link className="primary-highlight" to="/login">
              Sign In
            </Link>
          </Typography>
        </Box>
        <img className="register-img" src={img} alt="img" />
      </Card>
    </Box>
  );
};

export default Register;

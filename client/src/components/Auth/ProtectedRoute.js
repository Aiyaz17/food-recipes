import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RequireAuth(WrappedComponent) {
  function WithAuth(props) {
    const navigate = useNavigate();
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
      }
    }, []);

    return <WrappedComponent {...props} />;
  }

  return WithAuth;
}

export default RequireAuth;

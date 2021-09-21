import axios from "axios";
import { useState, useEffect } from "react";

export const useUser = () => {
  const [user, setUser] = useState({
    isAuthenticated: false,
    id: "",
    token: "",
  });

  useEffect(() => {
    axios.get("/api/user").then((res) => {
      setUser(res.data)
    });
  }, []);

  return {user};
};

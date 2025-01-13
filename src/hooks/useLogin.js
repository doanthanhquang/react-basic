import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../actions";
import { toast } from "react-toastify";
import axios from "axios";

const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [errorUsername, setErrorUsername] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const checkValidatePassword = (password) => {
    const validatePassword = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,18}$/;

    if (!password) {
      setErrorPassword("Password is required");
      return true;
    } else if (!validatePassword.test(password)) {
      setErrorPassword("Password must be 6-18 characters long, include at least 1 uppercase letter and 1 special character");
      return true;
    } else {
      setErrorPassword("");
      return false;
    }
  };

  const checkValidateUsername = (username) => {
    const validateEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!username) {
      setErrorUsername("Username is required");
      return true;
    } else if (!validateEmail.test(username)) {
      setErrorUsername("Please enter a valid email address");
      return true;
    } else {
      setErrorUsername("");
      return false;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const formData = new FormData(form);
    const username = formData.get("username");
    const password = formData.get("password");

    checkValidateUsername(username);
    checkValidatePassword(password);

    if (username && password && !checkValidateUsername(username) && !checkValidatePassword(password)) {
      axios
        .get("https://mocki.io/v1/d1eaa245-a9c4-4c5f-9257-c2815d9385f7")
        .then((response) => {
          const userData = response.data;
          navigate("/dashboard");
          toast.success("Login successful!");
          dispatch(setUser(userData));
        })
        .catch((response) => {
          toast.error(response.message);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  return {
    loading,
    errorUsername,
    errorPassword,
    handleLogin,
  };
}

export default useLogin;

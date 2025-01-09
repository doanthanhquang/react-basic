import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as FaceBookIcon } from "../../assets/svg/facebook.svg";
import { ReactComponent as GoogleIcon } from "../../assets/svg/google.svg";
import { ReactComponent as TwitterIcon } from "../../assets/svg/twitter.svg";
import { useDispatch } from 'react-redux';
import { setUser } from '../../actions';
import { toast } from 'react-toastify';
import styles from "./LoginPage.module.scss";
import axios from 'axios';


const LoginPage = () => {
  const navigate = useNavigate(); 
  const dispatch = useDispatch();

  const [errorUsername, setErrorUsername] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

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
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form)
    const username = formData.get("username")
    const password = formData.get("password")
    checkValidateUsername(username)
    checkValidatePassword(password)

    if (username && password && !checkValidateUsername(username) && !checkValidatePassword(password)) {
      try {
        const response = await axios.get('https://mocki.io/v1/d1eaa245-a9c4-4c5f-9257-c2815d9385f7');

        const userData = response.data;

        navigate('/dashboard')
        toast.success('Login successful!');

        dispatch(setUser(userData));
      } catch (err) {
        toast.error(err.message);
      } finally {}
    }
  };

  const signUp = () => {
    navigate('/sign-up')
  }

  const forgotPassword = () => {
    navigate('/forgot-password')
  }

  return (
    <div className={styles["login-page"]}>
      <div className={styles["login-container"]}>
        <h2>Login</h2>
        <form onSubmit={handleLogin} noValidate>
          <div className={styles["input-group"]}>
            <label>Username</label>
            <div className={styles["input"]}>
              <i className="fa-regular fa-user" />
              <input type="email" required placeholder="Type your username" name="username" />
            </div>
          </div>
          {errorUsername && <div className={styles["error-message"]}>{errorUsername}</div>}
          <div className={styles["input-group"]}>
            <label>Password</label>
            <div className={styles["input"]}>
              <i className="fa-solid fa-lock"></i>
              <input type="password" required placeholder="Type your password" name="password" />
            </div>
          </div>
          {errorPassword && <div className={styles["error-message"]}>{errorPassword}</div>}
          <div className={styles["forgot-password"]} onClick={forgotPassword}>Forgot password?</div>
          <button type="submit" className={styles["login-button"]}>
            LOGIN
          </button>
        </form>
        <div className={styles["social-login"]}>
          <p>Or Sign Up Using</p>
          <div className={styles["social-icons"]}>
            <FaceBookIcon className={styles["icon"]} />
            <TwitterIcon className={styles["icon"]} />
            <GoogleIcon className={styles["icon"]} />
          </div>
          <p>Or Sign Up Using</p>
        </div>
        <div className={styles["signup-link"]} onClick={signUp}>SIGN UP</div>
      </div>
    </div>
  );
};

export default LoginPage;

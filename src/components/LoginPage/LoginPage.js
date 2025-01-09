import React, { useState } from "react";
import styles from "./LoginPage.module.scss";
import { ReactComponent as FaceBookIcon } from "../../assets/svg/facebook.svg";
import { ReactComponent as GoogleIcon } from "../../assets/svg/google.svg";
import { ReactComponent as TwitterIcon } from "../../assets/svg/twitter.svg";

const LoginPage = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form)
    const username = formData.get("username")
    const password = formData.get("password")
    checkValidateUsername(username)
    checkValidatePassword(password)

    if (username && password && !checkValidateUsername(username) && !checkValidatePassword(password)) {
      console.log("Login success");
    }
  };

  return (
    <div className={styles["login-page"]}>
      <div className={styles["login-container"]}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className={styles["input-group"]}>
            <label>Username</label>
            <div className={styles["input"]}>
              <i class="fa-regular fa-user" />
              <input type="email" required placeholder="Type your username" name="username" />
            </div>
          </div>
          {errorUsername && <div className={styles["error-message"]}>{errorUsername}</div>}
          <div className={styles["input-group"]}>
            <label>Password</label>
            <div className={styles["input"]}>
              <i class="fa-solid fa-lock"></i>
              <input type="password" required placeholder="Type your password" name="password" />
            </div>
          </div>
          {errorPassword && <div className={styles["error-message"]}>{errorPassword}</div>}
          <div className={styles["forgot-password"]}>Forgot password?</div>
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
        <div className={styles["signup-link"]}>SIGN UP</div>
      </div>
    </div>
  );
};

export default LoginPage;

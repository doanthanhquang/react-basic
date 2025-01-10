import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as FaceBookIcon } from "../../assets/svg/facebook.svg";
import { ReactComponent as GoogleIcon } from "../../assets/svg/google.svg";
import { ReactComponent as TwitterIcon } from "../../assets/svg/twitter.svg";
import styles from "./LoginPage.module.scss";
import useLogin from "../../hooks/useLogin";

const LoginPage = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const { loading, errorUsername, errorPassword, handleLogin } = useLogin();

  const signUp = () => {
    navigate("/sign-up");
  };

  const forgotPassword = () => {
    navigate("/forgot-password");
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className={styles["login-page"]}>
      <div className={styles["login-container"]}>
        <h2>Login</h2>
        <form onSubmit={handleLogin} noValidate>
          <div className={styles["input-group"]}>
            <label>Username</label>
            <div className={styles["input"]}>
              <i className="fa-regular fa-user" />
              <input type="email" placeholder="Type your username" name="username" />
            </div>
          </div>
          {errorUsername && <div className={styles["error-message"]}>{errorUsername}</div>}
          <div className={styles["input-group"]}>
            <label>Password</label>
            <div className={styles["input"]}>
              <i className="fa-solid fa-lock"></i>
              <input type={showPassword ? "text" : "password"} placeholder="Type your password" name="password" onChange={handlePasswordChange} />
              {password && <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"} ${styles["show-password"]}`} onClick={handleShowPassword}></i>}
            </div>
          </div>
          {errorPassword && <div className={styles["error-message"]}>{errorPassword}</div>}
          <div className={styles["forgot-password"]} onClick={forgotPassword}>
            Forgot password?
          </div>
          <button type="submit" className={styles["login-button"]} disabled={loading}>
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
        <div className={styles["signup-link"]} onClick={signUp}>
          SIGN UP
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

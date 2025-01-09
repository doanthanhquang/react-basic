import React, { useState } from "react";
import styles from'./LoginPage.module.scss'
import { ReactComponent as FaceBookIcon } from '../../assets/svg/facebook.svg';
import { ReactComponent as GoogleIcon } from '../../assets/svg/google.svg';
import { ReactComponent as TwitterIcon } from '../../assets/svg/twitter.svg';

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Both fields are required");
      return;
    }

    console.log("Logging in with:", { username, password });
    setError("");
  };

  return (
    <div className={styles['login-page']}>
      <div className={styles['login-container']}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles['input-group']}>
            <label>Username</label>
            <div className={styles['input']}>
              <i class="fa-regular fa-user"/> 
              <input
                type="email"
                placeholder="Type your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className={styles['input-group']}>
            <label>Password</label>
            <div className={styles['input']}>
              <i class="fa-solid fa-lock"></i>
              <input
                type="password"
                placeholder="Type your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className={styles['forgot-password']}>Forgot password?</div>
          <button type="submit" className={styles['login-button']}>LOGIN</button>
        </form>
        <div className={styles['social-login']}>
          <p>Or Sign Up Using</p>
          <div className={styles['social-icons']}>
            <FaceBookIcon className={styles['icon']}/>  
            <TwitterIcon className={styles['icon']}/>  
            <GoogleIcon className={styles['icon']}/>
          </div>
        <p>Or Sign Up Using</p>
        </div>
        <div className={styles['signup-link']}>SIGN UP</div>
      </div>
    </div>
  );
};

export default LoginPage;

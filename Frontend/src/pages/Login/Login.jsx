import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import Layout from "../../components/Layout/Layout";
import classes from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill all the fields");
      return;
    }
    try {
      const res = await axios.post("/user/login", { email, password });
      console.log(res.data);
      if (res && res.data.token) {
        localStorage.setItem("token", res.data.token);
        alert("Login Successful");
        navigate("/home", { replace: true });
      } else {
        alert(res.data.message || "Login failed");
      }
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.error || "Server error");
    }
  };

  return (
    <Layout>
      <main className={classes.auth_page}>
        <div className={classes.bg_shape}></div>
        <section className={classes.auth_grid}>
          {/* Login Card */}
          <div className={classes.auth_card}>
            <h2>Login your account</h2>
            <p className={classes.sub}>
              Don't have an account?{" "}
              <a href="/register">Create a new account</a>
            </p>

            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className={classes.form_row}>
                <label className={classes.label}></label>

                <input
                  className={classes.input}
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {/* Password */}
              <div className={`${classes.form_row} ${classes.input_with_icon}`}>
                <label className={classes.label}></label>

                <input
                  className={classes.input}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  type="button"
                  className={classes.icon_btn}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={classes.eye_icon}
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  ) : (
                    /* Eye SVG */
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={classes.eye_icon}
                    >
                      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8s4-8 11-8a10.94 10.94 0 0 1 7.94 11.06" />
                      <path d="M1 1l22 22" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Submit */}
              <button type="submit" className={classes.btn}>
                submit
              </button>

              <div className={classes.alt_link}>
                <a href="/register">Create an account?</a>
              </div>
            </form>
          </div>

          {/* Info Side */}
          <aside className={classes.info}>
            <small>About</small>
            <h3>Evangadi Networks Q&amp;A</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quidem
              voluptate officiis beatae nobis pariatur omnis facere accusamus
              laboriosam hic,
            </p>
            <p>
              Ullam ipsum, provident minus laudantium esse soluta maiores
              nostrum nisi sunt perferendis dolorum.
            </p>
            <button className={classes.cta}>HOW IT WORKS</button>
          </aside>
        </section>
      </main>
    </Layout>
  );
};

export default Login;
// const [showPassword, setShowPassword] = useState(false);

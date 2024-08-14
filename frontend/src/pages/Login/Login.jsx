import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import Footer from "../../components/Footer/Footer";
import { useContext, useState } from "react";
import axios from "axios";
import { URL } from "../../url";
import { UserContext } from "../../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  /* Login info */

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        URL + "/api/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      //console.log(res.data);
      setUser(res.data);
      navigate("/");
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  return (
    <>
      <div className="navbar">
        <h1>
          <Link className="nav-brand" to="/">
            WHIMSY
          </Link>
        </h1>
        <h3>
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </h3>
      </div>
      <div className="login">
        <div className="login-box">
          <p className="login-header">Login to your Account</p>

          <div className="login-form">
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="login-details"
              type="text"
              placeholder="Enter your email"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="login-details"
              type="password"
              placeholder="Enter your password"
            />
            <button onClick={handleLogin} className="login-button">
              Login
            </button>
            {error && (
              <h3 className="error-message">
                Something went wrong! Try again.
              </h3>
            )}
          </div>

          <div className="login-register">
            <span className="login-register-text">New here?</span>
            <span>
              <Link to="/register" className="login-register-link">
                Register
              </Link>
            </span>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;

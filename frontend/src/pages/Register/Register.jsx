import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import Footer from "../../components/Footer/Footer";
import { useState } from "react";
import axios from "axios";
import { URL } from "../../url";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  /*   console.log(username);
  console.log(email);
  console.log(password);
 */

  const handleRegister = async () => {
    try {
      const res = await axios.post(URL + "/api/auth/register", {
        username,
        email,
        password,
      });
      setUsername(res.data.username);
      setEmail(res.data.email);
      setPassword(res.data.password);
      setError(false);
      navigate("/login");
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
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </h3>
      </div>
      <div className="register">
        <div className="register-box">
          <p className="register-header">Register to Whimsy</p>

          <div className="register-form">
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="register-details"
              type="text"
              placeholder="Enter your email"
            />
            <input
              onChange={(e) => setUsername(e.target.value)}
              className="register-details"
              type="text"
              placeholder="Enter your Username"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="register-details"
              type="password"
              placeholder="Enter your password"
            />
            <button onClick={handleRegister} className="register-button">
              Register
            </button>
          </div>

          {error && (
            <h3 className="error-message">Something went wrong! Try again.</h3>
          )}

          <div className="register-login">
            <span className="register-login-text">
              Already have an account?
            </span>
            <span>
              <Link to="/login" className="register-login-link">
                Login
              </Link>
            </span>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;

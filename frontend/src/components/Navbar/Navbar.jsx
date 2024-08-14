import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { FaSearch } from "react-icons/fa";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { URL } from "../../url";

const Navbar = () => {
  const { user } = useContext(UserContext);
  const { setUser } = useContext(UserContext);

  const [prompt, setPrompt] = useState(false);
  const navigate = useNavigate();

  const path = useLocation().pathname;

  //console.log(prompt);

  const handleLogout = async () => {
    try {
      const res = await axios.get(URL + "/api/auth/logout", {
        withCredentials: true,
      });
      console.log(res);
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="navbar">
      <h1>
        <Link className="nav-brand" to="/">
          WHIMSY
        </Link>
      </h1>

      {path === "/" && (
        <div className="search-bar">
          <p
            onClick={() => {
              navigate(prompt ? "?search=" + prompt : navigate("/"));
            }}
          >
            <FaSearch />
          </p>
          <input
            onChange={(e) => setPrompt(e.target.value)}
            className="search-box"
            placeholder="Search a post"
            type="text"
          />
        </div>
      )}
      <div className="nav-links">
        {user ? (
          <h3 className="nav-link">
            <Link className="nav-link" to="/write">
              Write
            </Link>
          </h3>
        ) : (
          <h3>
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </h3>
        )}

        {!user && (
          <h3>
            <Link className="nav-link" to="/register">
              Register
            </Link>
          </h3>
        )}

        {user ? (
          <h3 className="nav-link" onClick={handleLogout}>
            Logout
          </h3>
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./PersonalPosts.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { URL } from "../../url";
import { Link, useLocation } from "react-router-dom";
import HomePosts from "../../components/HomePosts/HomePosts";

const PersonalPosts = () => {
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const { user } = useContext(UserContext);

  console.log(user);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/user/" + user._id);
      setPosts(res.data);

      if (res.data.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [search]);
  return (
    <>
      <Navbar />
      <div className="personal-posts">
        <h1>Your Posts</h1>
        {!noResults ? (
          posts.map((post) => (
            <>
              <Link
                className="nav-link"
                to={user ? `/posts/post/${post._id}` : "/login"}
              >
                <HomePosts key={post._id} post={post} />
              </Link>
            </>
          ))
        ) : (
          <h3> No posts available</h3>
        )}
      </div>
      <Footer />
    </>
  );
};

export default PersonalPosts;

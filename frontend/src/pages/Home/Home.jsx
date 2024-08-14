import HomePosts from "../../components/HomePosts/HomePosts";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Home.css";
import axios from "axios";
import { URL } from "../../url";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const Home = () => {
  const { search } = useLocation();
  //console.log(search);
  const [posts, setPosts] = useState([]);

  const [noResults, setNoResults] = useState(false);

  const { user } = useContext(UserContext);

  //console.log(user);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/" + search);
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
      <div className="home">
        {!noResults ? (
          posts.map((post) => (
            <>
              <Link
                className="home-post-link"
                to={user ? `/posts/post/${post._id}` : "/login"}
              >
                <HomePosts key={post._id} post={post} />
              </Link>
            </>
          ))
        ) : (
          <h3>No posts available</h3>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Home;

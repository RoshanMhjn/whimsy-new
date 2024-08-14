import { useNavigate, useParams } from "react-router-dom";
import Comment from "../../components/Comment/Comment";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import "./PostDetails.css";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { URL, IF } from "../../url";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";

const PostDetails = () => {
  const postId = useParams().id;

  const [post, setPost] = useState({});
  const { user } = useContext(UserContext);

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const navigate = useNavigate();

  const fetchPost = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/" + postId);
      //console.log(res.data);
      setPost(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePost = async () => {
    try {
      const res = await axios.delete(URL + "/api/posts/" + postId, {
        withCredentials: true,
      });
      //console.log(res.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const fetchPostComments = async () => {
    try {
      const res = await axios.get(URL + "/api/comments/post/" + postId);
      setComments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPostComments();
  }, [postId]);

  const postComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        URL + "/api/comments/create",
        {
          comment: comment,
          author: user.username,
          postId,
          userId: user._id,
        },
        { withCredentials: true }
      );
      fetchPostComments();
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="post-details">
        <div className="post-detail">
          <div className="post-title-container">
            <h1 className="post-title">{post.title}</h1>
            {user?._id === post.userId && (
              <div className="post-edit-buttons">
                <p onClick={() => navigate("/edit/" + postId)}>
                  <BiEdit />
                </p>
                <p onClick={handleDeletePost}>
                  <MdDelete />
                </p>
              </div>
            )}
          </div>

          <div className="post-user-details">
            <p className="post-username">@{post.username}</p>
            <div className="right-date">
              <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
              <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
            </div>
          </div>
          <div className="post-image-container">
            <img src={IF + post.photo} className="post-main-image" alt="" />
          </div>
          <p className="post-main-text">{post.desc}</p>
          <div className="post-category">
            <p className="post-category-title">Categories:</p>
            {post.categories?.map((c, i) => (
              <div key={i} className="category-box">
                {c}
              </div>
            ))}
          </div>

          <h3 className="comment-main">Comments: </h3>
          <div className="comment-area">
            {/* comment */}
            {comments?.map((c) => (
              <Comment key={c._id} c={c} post={post} />
            ))}
          </div>
          {/* Write a comment */}
          <div className="comment-input">
            <input
              onChange={(e) => setComment(e.target.value)}
              type="text"
              className="comment-textarea"
              placeholder="write a comment"
            />
            <button onClick={postComment} className="comment-button">
              Add Comment
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PostDetails;

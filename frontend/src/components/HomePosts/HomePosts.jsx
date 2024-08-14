/* eslint-disable react/prop-types */
import "./HomePosts.css";

import { IF } from "../../url";

const HomePosts = ({ post }) => {
  return (
    <div className="home-posts">
      <div className="left-home">
        <img src={IF + post.photo} alt="" className="left-image" />
      </div>

      <div className="right-home">
        <h1 className="right-title">{post.title}</h1>
        <div className="right-details">
          <p>@{post.username}</p>
          <div className="right-date">
            <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>

            <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
          </div>
        </div>

        <p className="right-description">{post.desc}</p>
      </div>
    </div>
  );
};

export default HomePosts;

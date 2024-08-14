/* eslint-disable react/prop-types */
import axios from "axios";
import "./Comment.css";

import { MdDelete } from "react-icons/md";
import { URL } from "../../url";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const Comment = ({ c }) => {
  const { user } = useContext(UserContext);
  const deleteComment = async (id) => {
    try {
      await axios.delete(URL + "/api/comments/" + id, {
        withCredentials: true,
      });
      window.location.reload(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="comment-field">
        <div className="comment-user-details">
          <h3 className="comment-username">@{c.author}</h3>
          <div className="comment-date-time">
            <p>{new Date(c.updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(c.updatedAt).toString().slice(16, 24)}</p>
            {user?._id === c?.userId ? (
              <div className="comment-edit-buttons">
                <p onClick={() => deleteComment(c._id)}>
                  <MdDelete />
                </p>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <p className="comment">{c.comment}</p>
      </div>
    </div>
  );
};

export default Comment;

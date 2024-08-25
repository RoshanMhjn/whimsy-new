import { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./EditPost.css";
import { ImCross } from "react-icons/im";
import Footer from "../../components/Footer/Footer";
import { URL } from "../../url";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

const EditPost = () => {
  const postId = useParams().id;
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);

  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const fetchPost = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/" + postId);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setFile(res.data.photo);
      setCats(res.data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  /* post edit function */

  const handleUpdate = async (e) => {
    e.preventDefault();

    const post = {
      title,
      desc,
      username: user.username,
      userId: user._id,
      categories: cats,
    };
    if (
      !title ||
      !desc ||
      (file === null && !post.photo) ||
      cats.length === 0
    ) {
      alert("Please fill in all the fields and select at least one category.");
      return;
    }

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("img", filename);
      data.append("file", file);
      post.photo = filename;

      //upload
      try {
        const imgUpload = await axios.post(URL + "/api/upload", data);

        //console.log(imgUpload.data);
      } catch (err) {
        console.log(err);
      }
    }

    //post upload

    try {
      const res = await axios.put(URL + "/api/posts/" + postId, post, {
        withCredentials: true,
      });
      navigate("/posts/post/" + res.data._id);
      //  console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCategory = (i) => {
    let updatedCats = [...cats];
    updatedCats.splice(i);
    setCats(updatedCats);
  };

  const addCategory = () => {
    let updatedCats = [...cats];
    updatedCats.push(cat);
    setCat("");
    setCats(updatedCats);
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  return (
    <div>
      <Navbar />
      <div className="create-post">
        <h1 className="create-post-title">Update Post</h1>
        <form>
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            className="post-input"
            placeholder="Enter Post Title"
          />
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            className="file-input"
          />
          <div className="post-category-choose">
            <div className="post-category-input">
              <input
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                type="text"
                placeholder="Enter Post Category"
                className="post-category-text"
              />
              <div onClick={addCategory} className="post-category-add">
                Add
              </div>
            </div>

            {/* Categories */}

            <div className="post-category-buttons">
              {cats?.map((c, i) => (
                <div key={i} className="post-category-show">
                  <p>{c}</p>
                  <p onClick={() => deleteCategory(i)}>
                    <ImCross />
                  </p>
                </div>
              ))}
            </div>
          </div>
          {/* text-area */}
          <textarea
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
            rows={15}
            cols={30}
            className="post-main-entry"
            placeholder="Enter post description"
          />

          {/* edit post button */}

          <button onClick={handleUpdate} className="create-post-button">
            Update
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default EditPost;

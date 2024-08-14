import { useContext, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import "./CreatePost.css";
import { ImCross } from "react-icons/im";
import { UserContext } from "../../context/UserContext";
import { URL } from "../../url";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);

  console.log(file);
  const { user } = useContext(UserContext);

  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);

  const navigate = useNavigate();

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

  const handleCreate = async (e) => {
    e.preventDefault();

    const post = {
      title,
      desc,
      username: user.username,
      userId: user._id,
      categories: cats,
    };
    if (!title || !desc || !file || cats.length === 0) {
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
      const res = await axios.post(URL + "/api/posts/create", post, {
        withCredentials: true,
      });
      navigate("/posts/post/" + res.data._id);
      //  console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="create-post">
        <h1 className="create-post-title">Create a Post</h1>
        <form>
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="post-input"
            placeholder="Enter Post Title"
            required
          />
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            className="file-input"
            required
          />
          <div className="post-category-choose">
            <div className="post-category-input">
              <input
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                type="text"
                placeholder="Enter Post Category"
                className="post-category-text"
                required
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
            rows={15}
            cols={30}
            className="post-main-entry"
            placeholder="Enter post description"
            required
          />
          <button onClick={handleCreate} className="create-post-button">
            Create
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CreatePost;

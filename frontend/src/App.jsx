import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import "./App.css";

import CreatePost from "./pages/CreatePost/CreatePost";
import EditPost from "./pages/EditPost/EditPost";

import { UserContextProvider } from "./context/UserContext";
import PostDetails from "./pages/PostDetails/PostDetails";
import PersonalPosts from "./pages/PersonalPosts/PersonalPosts";

const App = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/write" element={<CreatePost />} />
        <Route path="/posts/post/:id" element={<PostDetails />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/myposts/:id" element={<PersonalPosts />} />
      </Routes>
    </UserContextProvider>
  );
};

export default App;

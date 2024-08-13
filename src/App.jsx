import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login.jsx";
import Home from "./components/Home.jsx";
import SignUp from "./components/auth/SignUp.jsx";
import AuthRoute from "./components/auth/AuthRoute.jsx";
import PostDetail from "./components/PostDetail.jsx";
import Articles from "./components/Articles.jsx";
import History from "./components/History.jsx";
import UserProfile from "./components/UserProfile.jsx";
import PostCreate from "./components/PostCreate.jsx";
import PostEdit from "./components/PostEdit.jsx";
import User from "./components/User.jsx";

function App() {
  return (
    <div className="container main">
      <BrowserRouter>
        <Routes>
          <Route element={<AuthRoute />}>
            <Route path="/myprofile" element={<UserProfile />} />
            <Route path="/posts/:postId" element={<PostDetail />} />
            <Route path="/posts/:postId/edit" element={<PostEdit />} />
            <Route path="/my-articles" element={<Articles />} />
            <Route path="/post-history" element={<History />} />
            <Route path="/create-post" element={<PostCreate />} />
            <Route path="/:userId/details" element={<User />} />
          </Route>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home.jsx";
import Login from "./components/auth/Login.jsx";
import SignUp from "./components/auth/SignUp.jsx";
import AuthRoute from "./components/auth/AuthRoute.jsx";
import PostDetail from "./components/pages/posts/PostDetail.jsx";
import Articles from "./components/pages/articles/Articles.jsx";
import History from "./components/pages/history/History.jsx";
import UserProfile from "./components/pages/user/UserProfile.jsx";
import PostCreate from "./components/pages/posts/PostCreate.jsx";
import PostEdit from "./components/pages/posts/PostEdit.jsx";
import User from "./components/pages/user/User.jsx";
import NotFound from "./components/pages/NotFound.jsx";
import RestrictedRoute from "./components/auth/RestrictedRoute.jsx";

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
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/" exact element={<Home />} />
          <Route element={<RestrictedRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

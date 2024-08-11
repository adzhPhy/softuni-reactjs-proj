import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login.jsx";
import Home from "./components/Home.jsx";
import SignUp from "./components/auth/SignUp.jsx";
import AuthRoute from "./components/auth/AuthRoute.jsx";
import PostDetail from "./components/PostDetail.jsx";
import Articles from "./components/Articles.jsx";
import UserProfile from "./components/UserProfile.jsx";

function App() {
  return (
    <div className="container main">
      <BrowserRouter>
        <Routes>
          <Route element={<AuthRoute />}>
            <Route path="/myprofile" element={<UserProfile />} />
            <Route path="/posts/:postId" element={<PostDetail />} />
            <Route path="/my-articles" element={<Articles />} />
            <Route path="/create-post" element={<Articles />} />
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

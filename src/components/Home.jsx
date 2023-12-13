import Navbar from "./Navbar";
import Footer from "./Footer";
import PostList from "./PostList";

function Home() {
  return (
    <div className="home">
      <Navbar />
      <div>
        <div></div>
        <PostList />
        <div></div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;

import Navbar from "./Navbar";
import Footer from "./Footer";
import PostList from "./PostList";

function Home() {
  return (
    <>
      <Navbar />
      <div>
        <div></div>
        <PostList />
        <div></div>
      </div>
      <Footer />
    </>
  );
}

export default Home;

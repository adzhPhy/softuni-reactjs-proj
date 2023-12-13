import Navbar from "./Navbar";
import Footer from "./Footer";
import PostList from "./PostList";

function Home() {
  return (
    <div className="flex flex-col h-screen gap-3 justify-between">
      <Navbar />
      <div className="mb-auto">
        <PostList />
      </div>
      <Footer />
    </div>
  );
}

export default Home;

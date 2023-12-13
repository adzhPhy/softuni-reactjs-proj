import Navbar from "./Navbar";
import Footer from "./Footer";
import PostList from "./PostList";

function Home() {
  return (
    <div className="flex flex-col gap-3 justify-between max-w-screen-lg">
      <Navbar />
      <div className="flex gap-10 justify-center items-center bg-white text-gray-900">
        <PostList />
      </div>
      <Footer />
    </div>
  );
}

export default Home;

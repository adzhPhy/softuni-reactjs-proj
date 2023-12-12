function Post({ author, title, content }) {
  var imgsrc = `https://robohash.org/${author}.png`;
  return (
    <div className="container main">
      <div className="">
        <img
          className="border"
          style={{ backgroundColor: "whitesmoke" }}
          width={50}
          height={50}
          src={imgsrc}
        />
      </div>
      <div>{title}</div>
      <div>{content}</div>
    </div>
  );
}

export default Post;

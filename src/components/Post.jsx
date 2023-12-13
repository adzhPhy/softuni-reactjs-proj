function Post({ author, title, content }) {
  
  var imgsrc = `https://robohash.org/${author}.png`;
  return (
    <div className="container main post-div font-body">
      <div className="flex items-center">
        <img
          className="border"
          style={{ backgroundColor: "whitesmoke" }}
          width={50}
          height={50}
          src={imgsrc}
        />
        <div className="">{title}</div>
      </div>
      <p className="content">{content}</p>
    </div>
  );
}

export default Post;

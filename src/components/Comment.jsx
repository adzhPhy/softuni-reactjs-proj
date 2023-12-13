import React from "react";

function Comment({ author, content }) {
  return (
    <div>
      <div>{author}</div>
      <div>{content}</div>
    </div>
  );
}

export default Comment;

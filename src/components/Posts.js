import React from "react";

const Posts = ({ posts, loading }) => {
  if (loading) {
    return <p>loading...........</p>;
  }
  return (
    <>
      {posts.map((item) => (
        <li key={item.name}>
          <span>
            {item.alpha2Code} {'=> '} 
          </span>
          {item.name}
        </li>
      ))}
    </>
  );
};

export default Posts;

import React from "react";
import MyPostItem from "./MyPostItem";
import { useState, useEffect } from "react";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const dataId = JSON.parse(localStorage.getItem("id"));

  const fetcher = async () => {
    const response = await fetch(
      `http://localhost:5000/feed/getMyPosts/${dataId.id}`
    );
    const data = await response.json();
    console.log(data);
    setPosts(data.posts);
  };

  useEffect(() => {
    fetcher();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-8 p-10">
      {posts.map((post) => (
        <MyPostItem
          key={post._id}
          id={post._id}
          title={post.title}
          image={post.image}
        />
      ))}
    </div>
  );
};

export default MyPosts;

/*
 
*/

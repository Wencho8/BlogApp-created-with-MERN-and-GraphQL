import React from "react";
import NavBar from "../components/NavBar";
import PostPage from "../components/PostPage";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const IndividualPost = () => {
  const postId = useParams().postId;

  const [post, setPost] = useState({});
  const [user, setUser] = useState('');

  const fetcher = async () => {
    const response = await fetch(
      `http://localhost:5000/feed/getPost/${postId}`
    );
    const data = await response.json();
    console.log(data.post.creator.name);
    setPost(data.post); //arraylist de posts, nombre de coleccion en mongodb
    setUser(data.post.creator.name);
  };

  useEffect(() => {
    fetcher();
  }, []);

  return (
    <>
      <NavBar />
      <PostPage
        key={post._id}
        id={post._id}
        title={post.title}
        description={post.description}
        image={post.image}
        username={user}
        avatar={post.avatar}
      />
    </>
  );
};

export default IndividualPost;

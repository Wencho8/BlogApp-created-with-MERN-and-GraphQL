import React from 'react';
import PostItem from './PostItem';
import { useState, useEffect} from 'react';




const Posts = () => {


const [posts, setPosts] = useState([]);

const fetcher = async () => {
  const response = await fetch('http://localhost:5000/feed/getPosts');
  const data = await response.json();
  console.log(data.posts[0].creator.name);

  setPosts(data.posts); //arraylist de posts, nombre de coleccion en mongodb
};

useEffect(() => {
  fetcher();
}, []);



  return (
    <div className='grid grid-cols-3 gap-8 p-10'>
      {posts.map((post) => (
        <PostItem
            key={post._id}
            id={post._id}
            title={post.title}
            description={post.description}
            image={post.image}
            username={post.creator.name}
        />
      ))}
    </div>
  );
};

export default Posts;
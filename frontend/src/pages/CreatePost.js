import React from 'react';
import PostForm from '../components/PostForm';
import NavBar from '../components/NavBar';

const CreatePost = () => {

   return (
   <>
    <NavBar/>
    <h1 className="text-3xl font-bold px-10 my-1 text-teal-700">Create a Post</h1>
    <PostForm/>
   </>
    ) 
}


export default CreatePost;
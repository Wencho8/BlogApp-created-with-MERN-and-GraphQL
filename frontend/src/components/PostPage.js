import React from "react";


const PostPage= (props) => {
  
  return (
    <div className="flex justify-center items-center">
    <div className="flex flex-col p-3 items-center w-1/2">
      <h1 className="font-bold m-1 text-4xl p-1">{props.title}</h1>
      <img className="w-1/2 h-30 rounded-3xl" src={`http://localhost:5000/${props.image}`} alt="cover"/>
      <p className=" text-zinc-400 overflow-hidden text-2xl max-h-100 p-3 ">{props.description}</p>
      <div className="flex my-2 items-center gap-1">
        <img className=" w-25 h-20 cover mr-2 rounded-3xl" src={'/author.jpg'} alt="avatar" />
        <h2>{props.username}</h2>
      </div>
    </div>
  </div>
  );
};

export default PostPage;

/*

*/
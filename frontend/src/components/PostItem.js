import React from "react";
import { Link } from 'react-router-dom';

const PostItem = (props) => {


  return (
    <Link to={`/feed/${props.id}`}>
    <div className="flex flex-col p-3 cursor-pointer transform transition duration-100  hover:scale-105">
      <img className="w-100 h-60 rounded-3xl" src={`http://localhost:5000/${props.image}`} alt="cover"/>
      <h3 className="font-bold m-1">{props.title}</h3>
      <p className=" text-zinc-900 overflow-hidden text-sm max-h-12  ">{props.description}</p>
      <div className="flex my-2 items-center gap-1">
        <h6  className=" text-zinc-400 overflow-hidden text-sm max-h-12" >By {props.username}</h6>
      </div>
    </div>
    </Link>
  );
};

export default PostItem;

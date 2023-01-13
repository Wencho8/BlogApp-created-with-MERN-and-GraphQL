import React from "react";
import { useNavigate } from "react-router-dom";

const MyPostItem = (props) => {

  const navigate = useNavigate();

  const deleteHandler = async () => {
   
    const dataId = JSON.parse(localStorage.getItem("id"));

    fetch(`http://localhost:5000/feed/deletePost/${props.id}`, {
      method: 'DELETE',                                  //DELETE
      body: JSON.stringify({
        userId: dataId.id,  //send id
      }),  //send id
      headers: {
        'Content-Type': 'application/json',
      }, 
    }).then((response) => {
      if (response.ok) {
        console.log('Post deleted successfully');
      } 
    });
  
  };


  const editHandler = async () => {
   
    navigate(`/myposts/${props.id}`);

  };


  return (
    <div className="flex flex-col p-3 cursor-pointer transform transition">
      <img
        className="w-100 h-50 rounded-3xl"
        src={`http://localhost:5000/${props.image}`}
        alt="cover"
      />
      <h3 className="font-bold m-1">{props.title}</h3>
      <div className="flex my-2 items-center gap-1 ">
      <button onClick={editHandler} className=" cursor-pointer text-base font-bold p-3 border-2 border-white ml-4 text-white bg-yellow-500 hover:text-yellow-900">EDIT</button>
        <button onClick={deleteHandler} className=" cursor-pointer text-base font-bold p-3 border-2 border-white ml-4 text-white bg-red-500 hover:text-red-900">DELETE</button>
      </div>
    </div>
  );
};

export default MyPostItem;

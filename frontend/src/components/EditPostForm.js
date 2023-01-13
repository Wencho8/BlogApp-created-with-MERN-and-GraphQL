import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useInput from "../hooks/use-input";
import { useSelector } from "react-redux";
import PostItem from "./PostItem";

const EditPostForm = (props) => {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.login.id);
 

  const {
    value: enteredTitle,
    isValid: enteredTitleIsValid,
    hasError: titleInputHasError,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitleInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredDescription,
    isValid: enteredDescriptionIsValid,
    hasError: descriptionInputHasError,
    valueChangeHandler: descriptionChangedHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescriptionInput,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;

  if (enteredTitleIsValid && enteredDescriptionIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      //si no es valido me voy

      return;
    }

    const edited = {
        title: enteredTitle,
        description: enteredDescription,
        userId: userId
    }
    
    
    fetch(`http://localhost:5000/feed/updatePost/${props.post._id}`, {
      method: "PATCH",
      body: JSON.stringify(edited),
      headers: {
        'Content-Type': 'application/json',
      }, 
    })
      .then((response) => {
        if (response.ok) {
          console.log("Post editado");
        }
      })
      .catch((error) => {
        console.log(error);
      });

    resetTitleInput();
    resetDescriptionInput();
  };

  return (
    <div className="flex justify-center items-center">
      {" "}
      {/* para centrar todo lo de abajo  */}
      <div className=" flex flex-col items-center justify-center w-1/2 my-5 p-10 gap-5">
        <div className="flex flex-col  justify-center w-full gap-3">
          <label className="text-base font-bold">Title</label>
          <input
            className="border-2 border-gray-300 p-2 rounded-md"
            id="title"
            type="text"
            onChange={titleChangeHandler}
            onBlur={titleBlurHandler}
            value={enteredTitle}
          />
        </div>
        <div className="flex flex-col  justify-center w-full gap-3">
          <label className="text-base font-bold">Description</label>
          <textarea
            className="border-2  border-gray-300 p-2 rounded-md"
            rows={10}
            id="description"
            type="text"
            onChange={descriptionChangedHandler}
            onBlur={descriptionBlurHandler}
            value={enteredDescription}
          />
        </div>
        <button onClick={formSubmissionHandler} className="text-xl text-white bg-teal-500 p-3 border-2 border-white transform transition duration-100  hover:scale-125">Update</button>
      </div>
      <div className="flex flex-col items-center justify-center">
      <h1 className="text-xl font-bold text-teal-600">Original post</h1>
      <PostItem
        key={props.post._id}
        id={props.post._id}
        title={props.post.title}
        description={props.post.description}
        image={props.post.image}
        username={props.user}
      />
      </div>
    </div>
  );
};

export default EditPostForm;

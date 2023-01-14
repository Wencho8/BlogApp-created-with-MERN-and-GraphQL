import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import useInput from "../hooks/use-input";
import { useSelector } from "react-redux";

const PostForm = () => {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.login.id);

  const [image, setImage] = useState(null);
  const [imagePrev, setImagePrev] = useState(null);

  const changeInput = (e) => {
    const file = e.target.files[0];
    let url = URL.createObjectURL(file);

    setImage(file);
    setImagePrev(url);
  };

  const deleteHandler = () => {
    setImage(null);
    setImagePrev(null);
  };

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

    const formData = new FormData();
    console.log(enteredDescription,enteredTitle);
    console.log(userId);
    formData.append("title", enteredTitle);
    formData.append("description", enteredDescription);
    formData.append("image", image);
    formData.append("userId", userId);
    

    fetch("http://localhost:5000/feed/createPost", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          console.log("Post creado");
        }
      })
      .catch((error) => {
        console.log(error);
      });

    resetTitleInput();
    resetDescriptionInput();
    //navigate("/feed");
    //navigate(0);
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
          <label className="text-base font-bold">Image</label>
          <input
            className="border-2 border-gray-300 p-2 rounded-md"
            id="title"
            type="file"
            onChange={changeInput}
          />
          {image && (
            <div className="flex  ">
              <TrashIcon
                onClick={deleteHandler}
                className=" text-red-600 h-10 w-10 p-1 bg-gray-800 rounded-xl absolute transform transition duration-100  hover:scale-105"
              />
              <img
                alt="preview"
                src={imagePrev}
                className=" h-80 w-full rounded-3xl object-cover"
              ></img>
            </div>
          )}
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
        <button onClick={formSubmissionHandler} className="text-xl text-white bg-teal-500 p-3 border-2 border-white transform transition duration-100  hover:scale-125">Post</button>
      </div>
    </div>
  );
};

export default PostForm;

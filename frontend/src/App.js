import { Route, Routes } from "react-router-dom";
import User from "./pages/User";
import CreatePost from "./pages/CreatePost";
import IndividualPost from "./pages/IndividualPost";
import LoginPage from "./pages/LoginPage";
import MyPostPage from "./pages/MyPostPage";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loginActions } from "./store/LoginSlice";
import EditPage from "./pages/EditPage";
import React, { Suspense } from "react";
import LoadingSpinner from "./ui/LoadingSpinner";

function App() {
  const dispatch = useDispatch();
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    //Chequea el local storage.
    const data = JSON.parse(localStorage.getItem("token"));
    const dataId = JSON.parse(localStorage.getItem("id"));

    if (data && data.token) {
      dispatch(loginActions.setLogin(data.token));
      dispatch(loginActions.setLoginId(dataId.id));
      setIsLogged(true);
    }
  }, []);

  let routesAvailable;
  if (isLogged) {
    routesAvailable = (
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/myposts" element={<MyPostPage />} />
        <Route path="/feed" element={<User />} />
        <Route path="/feed/:postId" element={<IndividualPost />} />
        <Route path="/myposts/:postId" element={<EditPage />} />
        <Route path="/create" element={<CreatePost />} />
      </Routes>
    );
  } else {
    routesAvailable = (
      <Routes>
        <Route
          path="*"
          element={<h1 style={{ color: "red" }}>404 NOT FOUND</h1>}
        />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/myposts" element={<MyPostPage />} />
        <Route path="/feed" element={<User />} />
        <Route path="/feed/:postId" element={<IndividualPost />} />
        <Route path="/myposts/:postId" element={<EditPage />} />
        <Route path="/create" element={<CreatePost />} />
      </Routes>
    );
  }

  return (
    <>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      ></Suspense>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/myposts" element={<MyPostPage />} />
        <Route path="/feed" element={<User />} />
        <Route path="/feed/:postId" element={<IndividualPost />} />
        <Route path="/myposts/:postId" element={<EditPage />} />
        <Route path="/create" element={<CreatePost />} />
      </Routes>
    </>
  );
}

export default App;

/*
 <>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      ></Suspense>
      {routesAvailable}
    </>
*/

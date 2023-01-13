import { BellIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginActions } from "../store/LoginSlice";

const NavBar = () => {
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.login.login); //token
  const dispatch = useDispatch();

  const feedHandler = () => {
    navigate("/feed");
  };

  const postHandler = () => {
    navigate("/create");
  };

  const logoutHandler = () => {
    dispatch(loginActions.setLoginNull());
    navigate("/login");
  };

  const myPostHandler = () => {
    navigate("/myposts");
  };

  return (
    <div className="flex items-center justify-between w-full sticky top-0 z-10 bg-teal-500 p-1">
      <h1
        onClick={feedHandler}
        className="cursor-pointer text-base font-bold p-3 border-2 border-white ml-4 text-white hover:bg-white hover:text-teal-500 "
      >
        BlogApp
      </h1>
      {isLogin && (<div className="flex items-center justify-center gap-10 mr-4">
        <button 
        onClick={myPostHandler}
        className="text-xl text-white transform transition duration-100  hover:scale-125">
          My Posts
        </button>
        <button
          onClick={postHandler}
          className="text-xl text-white transform transition duration-100  hover:scale-125"
        >
          Post
        </button>
        <button
          onClick={feedHandler}
          className="text-xl text-white transform transition duration-100  hover:scale-125"
        >
          Feed
        </button>
        <BellIcon className="h-7 w-7 cursor-pointer text-white transform transition duration-100  hover:scale-125" />
        <button
        onClick={logoutHandler}
        className="text-xl text-white transform transition duration-100  hover:scale-125">
          Logout
        </button>
      </div>)}
    </div>
  );
};

export default NavBar;

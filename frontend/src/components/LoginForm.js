import { useState } from "react";
import useInput from "../hooks/use-input";
import { useDispatch,useSelector } from "react-redux";
import { loginActions } from "../store/LoginSlice";
import { redirect, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const Login = useSelector((state) => state.login.login); //token
  const dispatch = useDispatch(); //dispatch
  const navigate = useNavigate();

  const switchHandler = () => {
    setIsLoginMode((prevState) => !prevState);
  };

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.includes("@"));

  const {
    value: enteredPass,
    isValid: enteredPassIsValid,
    hasError: passInputHasError,
    valueChangeHandler: passChangedHandler,
    inputBlurHandler: passBlurHandler,
    reset: resetPassInput,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;

  if (enteredEmailIsValid && enteredPassIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = async event => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    if (isLoginMode) {    //LOGIN
      const user = {
        email: enteredEmail,
        password: enteredPass,
      }
    
      const responseData = await fetch('http://localhost:5000/users/login', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        }, });
      
        if (!responseData.ok) {
          resetNameInput();
    resetEmailInput();
    resetPassInput();
          return;
        }
      
       const data = await responseData.json(); 
       dispatch(loginActions.setLogin(data.token)); //dispatch sin expiration al ser login, se encarga reducer
       dispatch(loginActions.setLoginId(data.userId));
       navigate("/feed");

    }
    else{  //SIGNUP
     
      const user = {
        name: enteredName,
        email: enteredEmail,
        password: enteredPass,
      }

      fetch('http://localhost:5000/users/signup', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      }, 
    }).then((response) => {
      if (response.ok) {
        console.log("Registrado");
        setIsLoginMode(true);
      }
    });
    }
    
    resetNameInput();
    resetEmailInput();
    resetPassInput();
  };

  return (
    <div className="flex justify-center items-center">
      {" "}
      {/* para centrar todo lo de abajo  */}
      <div className=" flex flex-col items-center justify-center w-1/2 my-5 p-10 gap-5">
        {!isLoginMode && (
          <div className="flex flex-col  justify-center w-1/2 gap-3">
            <label className="text-base font-bold">Name</label>
            <input
              className="border-2 border-gray-300 p-2 rounded-md"
              id="email"
              type="email"
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
              value={enteredName}
            />
          </div>
        )}
        <div className="flex flex-col  justify-center w-1/2 gap-3">
          <label className="text-base font-bold">Email</label>
          <input
            className="border-2 border-gray-300 p-2 rounded-md"
            id="email"
            type="email"
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            value={enteredEmail}
          />
        </div>
        <div className="flex flex-col  justify-center w-1/2 gap-3">
          <label className="text-base font-bold">Password</label>
          <input
            className="border-2  border-gray-300 p-2 rounded-md"
            type="password"
            id="password"
            onChange={passChangedHandler}
            onBlur={passBlurHandler}
            value={enteredPass}
          />
        </div>
        <button
          onClick={formSubmissionHandler}
          className="text-xl text-white bg-teal-500 p-3 border-2 border-white transform transition duration-100  hover:scale-105"
        >
          {isLoginMode ? "LOGIN" : "SIGNUP"}
        </button>
        <button
          onClick={switchHandler}
          className="text-xl text-white bg-teal-500 p-3 border-2 border-white transform transition duration-100  hover:scale-105"
        >
          SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
        </button>
      </div>
    </div>
  );
};

export default LoginForm;


/*

if (isLoginMode) {    //LOGIN
      const user = {
        email: enteredEmail,
        password: enteredPass,
      }
    
      fetch('http://localhost:5000/users/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      }, 
    })
      .then((response) => {
        if (!response.ok) {
          return;
        }})
      .then((data) => {    
        dispatch(loginActions.setLogin(data.token)); //dispatch sin expiration al ser login, se encarga reducer
        dispatch(loginActions.setLoginId(data.userId));
        navigate("/feed");
      })
      .catch((error) => {
        console.log(error);
      });
    
    }
    else{  //SIGNUP
     
      const user = {
        name: enteredName,
        email: enteredEmail,
        password: enteredPass,
      }

      fetch('http://localhost:5000/users/signup', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      }, 
    }).then((response) => {
      if (response.ok) {
        console.log("Registrado");
        setIsLoginMode(true);
      }
    });
    }

*/
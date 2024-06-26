import React, { useRef, useState } from "react";
import Header from "./Header";
import { isCredentialsValid } from "../utils/validate";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { LOGIN_BG_IMAGE, LOGIN_BG_IMG_RESOLUTION } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const dispatch = useDispatch();

  const handleClickEvent = () => {
    const message = isCredentialsValid(
      email.current.value,
      password.current.value
    );
    setErrorMessage(message);
    if (message) return;
    if (!isSignInForm) {
      // sign up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(user);
          updateProfile(auth.currentUser, {
            displayName: name.current.value,
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({ uid: uid, email: email, displayName: displayName })
              );
             
            })
            .catch((error) => {
              // An error occurred
              const errorCode = error.code;
              const errorMessage = error.message;
              setErrorMessage(errorCode + "-" + errorMessage);
            });

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
          // ..
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          //const user = userCredential.user;
          // console.log(user);
          // navigate("/browse");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };
  const handleSignInToggle = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div className=" h-screen flex justify-center items-center">
      <Header />

      <img
        src={LOGIN_BG_IMAGE}
        srcSet={LOGIN_BG_IMG_RESOLUTION}
        alt=""
        className="absolute z-0"
      ></img>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute w-3/12 h-fit text-white z-10 right-0 left-0 bg-black mx-auto p-8 bg-opacity-80 "
      >
        <h1 className="text-3xl font-bold my-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Username"
            className="p-2 my-2 w-full rounded-lg bg-gray-500"
          />
        )}
        <input
          ref={email}
          type="email"
          placeholder="Email or Phone Number"
          className="p-2 my-2 w-full rounded-lg bg-gray-500"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-2 my-2 w-full rounded-lg bg-gray-500"
        />
        <p className="text-red-600 font-semibold">{errorMessage}</p>
        <div>
          <button
            onClick={handleClickEvent}
            className="p-2 my-10 bg-red-600 w-full rounded-lg"
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
        </div>
        <p className="p-2 cursor-pointer" onClick={handleSignInToggle}>
          {isSignInForm
            ? "New to Netflix? Sign Up now"
            : "Already a user? Sign In now"}
        </p>
      </form>
    </div>
  );
};

export default Login;

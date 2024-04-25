import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const handleSignInToggle = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div className=" h-screen flex justify-center items-center">
      <Header />

      <img
        src="https://assets.nflxext.com/ffe/siteui/vlv3/9f46b569-aff7-4975-9b8e-3212e4637f16/453ba2a1-6138-4e3c-9a06-b66f9a2832e4/IN-en-20240415-popsignuptwoweeks-perspective_alpha_website_small.jpg"
        srcset="https://assets.nflxext.com/ffe/siteui/vlv3/9f46b569-aff7-4975-9b8e-3212e4637f16/453ba2a1-6138-4e3c-9a06-b66f9a2832e4/IN-en-20240415-popsignuptwoweeks-perspective_alpha_website_small.jpg 1000w, https://assets.nflxext.com/ffe/siteui/vlv3/9f46b569-aff7-4975-9b8e-3212e4637f16/453ba2a1-6138-4e3c-9a06-b66f9a2832e4/IN-en-20240415-popsignuptwoweeks-perspective_alpha_website_medium.jpg 1500w, https://assets.nflxext.com/ffe/siteui/vlv3/9f46b569-aff7-4975-9b8e-3212e4637f16/453ba2a1-6138-4e3c-9a06-b66f9a2832e4/IN-en-20240415-popsignuptwoweeks-perspective_alpha_website_large.jpg 1800w"
        alt=""
        className="absolute z-0"
      ></img>
      <form className="absolute w-3/12 h-fit text-white z-10 right-0 left-0 bg-black mx-auto p-8 bg-opacity-80 ">
        <h1 className="text-3xl font-bold my-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            placeholder="Username"
            className="p-2 my-2 w-full rounded-lg bg-gray-500"
          />
        )}
        <input
          type="email"
          placeholder="Email or Phone Number"
          className="p-2 my-2 w-full rounded-lg bg-gray-500"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 my-2 w-full rounded-lg bg-gray-500"
        />
        <div>
          <button className="p-2 my-10 bg-red-600 w-full rounded-lg">
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

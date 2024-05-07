import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { NETFLIX_LOGO, USER_AVATAR } from "../utils/constants";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.

        dispatch(removeUser());

        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate("/browse")
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate('/')
      }
    });
    // unsubscribe when the component unmounts
    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  return (
    <div className="absolute w-screen top-0 left-0 z-10 bg-gradient-to-b from-black flex justify-between p-4">
      <img
        className="w-48"
        src={NETFLIX_LOGO}
        alt="netflix-logo"
      />
      {auth.currentUser && (
        <div className="flex items-center">
          <p className="font-bold text-white m-2">
            Welcome {auth.currentUser.displayName}!
          </p>
          <img
            className="w-12 h-12 rounded-md"
            src={USER_AVATAR}
            alt="usericon"
          />
          <button
            className="font-bold text-white  mx-2 "
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;

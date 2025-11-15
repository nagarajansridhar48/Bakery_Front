import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  reload,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import { AuthContext } from "./AuthContext";

const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  {
    /*Create an account*/
  }
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  {
    /*Signup with gmail account*/
  }
  const signupWithGmail = () => {
    return signInWithPopup(auth, googleProvider);
  };

  {
    /*Login using email and password*/
  }
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  {
    /*Logout*/
  }
  const logout = () => {
    signOut(auth);
  };

  {
    /*update user's profile*/
  }
//   const updateUserProfile = (name, photoURL) => {
//     return updateProfile(auth.currentUser, {
//       displayName: name,
//       photoURL: photoURL,
//     });
//   };
const updateUserProfile = (name, photoURL) => {
  return updateProfile(auth.currentUser, {
    displayName: name,
    photoURL: photoURL,
  }).then(() => reload(auth.currentUser));
};

  {
    /*Check signed-in user*/
  }
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      //   if (currentUser) {
      //     setUser(currentUser)
      //     const uid = user.uid;
      //     setLoading(false)
      //   } else {
      //     // User is signed out
      //     // ...
      //   }
      // });
      setUser(currentUser || null);
      setLoading(false);
    });
    return () => unSubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    signupWithGmail,
    login,
    logout,
    updateUserProfile,
    setUser
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

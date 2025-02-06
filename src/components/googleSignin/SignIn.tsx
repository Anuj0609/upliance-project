import React, { useEffect, useState } from 'react'
import {signInWithPopup} from "firebase/auth"
import { auth, googleProvider } from "./firebaseConfig";
import Home from "../../pages/index";

 

function SignIn() {
  const [value, setValue] = useState<string>("");

  const handleClick = () => {
    signInWithPopup(auth, googleProvider).then((data) => {
      const email = data.user.email ?? ""; 
      setValue(email);
      localStorage.setItem("email", email);
    });
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setValue(storedEmail ?? ""); 
    }
  }, []);
  return (
    <div>
      {value ? (
        <Home />
      ) : (
        <button onClick={handleClick}>SignIn With Google</button>
      )}
    </div>
  );
}

export default SignIn;
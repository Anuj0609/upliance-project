import React, { useEffect, useState } from 'react'
import {signInWithPopup} from "firebase/auth"
import { auth, googleProvider } from '@/components/googleSignin/firebaseConfig';
import Home from '@/components/Home';

 

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
        // Parent container - this will be your full screen wrapper
        <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-500 to-green-400">
          {/* Header */}
          <div className="p-6">
            <h1 className="text-4xl font-bold text-white tracking-wider">
              upliance<span className="text-green-300">.ai</span>
            </h1>
          </div>

          {/* Button container */}
          <div className="flex flex-col justify-center items-center w-screen h-[calc(100vh-100px)] gap-8">
            {/* Welcome text */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-2">
                Welcome to Upliance
              </h2>
              <p className="text-gray-100 text-lg">
                Sign in to continue to your account
              </p>
            </div>

            {/* Sign in button with glass effect */}
            <button
              onClick={handleClick}
              className="flex items-center gap-3 px-8 py-4 font-semibold text-white rounded-xl
        bg-white/20 backdrop-blur-md border border-white/30
        hover:bg-white/30 transform transition-all duration-200 
        hover:scale-105 hover:shadow-xl"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span className="text-lg">Sign in with Google</span>
            </button>

            {/* Footer text */}
            <p className="text-white/70 text-sm mt-4">
              By signing in, you agree to our Terms of Service and Privacy
              Policy
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignIn;
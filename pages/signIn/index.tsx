import React from "react";
import { useState } from "react";
import { supabase } from "utils/supabase";
import { useRouter } from "next/router";
import { useUser } from "contexts/userContext";
import Link from "next/link";
import Image from "next/image";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const { setUser } = useUser();

  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorText(error.message);
    } else if (data) {
      localStorage.setItem("message", "Sign-in successful!");

      setUser(data.user);

      router.push("/"); // Redirect to home page
    } else {
      console.error("Sign-in error: An unexpected error occurred");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen relative">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/sign_in_background.png"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority={true}
          quality={100}
          alt=""
        />
      </div>
      <form
        onSubmit={handleSignIn}
        className="flex flex-col w-96 min-w-fit rounded-xl bg-white p-10 gap-3 items-center z-10"
      >
        <a href="/" className="flex items-center">
          <Image
            src="/logo_ii.svg"
            width="50"
            height="50"
            className=""
            alt=""
          />
          <span className="ml-2 mt-3 text-4xl uppercase pr-3">Rośliny</span>
        </a>
        <div className="text-red-400">
          {errorText}
          {errorText && <div className="text-center">Please try again.</div>}
        </div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-md p-2 border border-gray-400 mt-3 input input-bordered"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-md p-2 border border-gray-400 input input-bordered"
        />
        <button
          className="btn btn-error uppercase tracking-wider text-md"
          type="submit"
        >
          Sign In
        </button>
        <div className="mt-3">
          No account?
          <div className="text-center">
            <Link className="mx-0 tracking-wider text-primary" href="/signUp">
              Sign Up
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignIn;

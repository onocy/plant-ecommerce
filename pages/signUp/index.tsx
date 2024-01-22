import React from "react";
import { useState } from "react";
import { supabase } from "utils/supabase";
import { useRouter } from "next/router";
import { useUser } from "contexts/userContext";
import Link from "next/link";
import Image from "next/image";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { setUser } = useUser();

  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();

    // const { data, error } = await supabase.auth.signInWithPassword({
    //   email,
    //   password,
    // });

    // if (error) {
    //   setErrorText(error.message);
    // } else if (data) {
    //   setUser(data.user);
    //   router.push("/"); // Redirect to home page
    // } else {
    //   console.error("Sign-in error: An unexpected error occurred");
    // }
  };

  return (
    <div className="flex justify-center items-center h-screen relative">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/sign_in_background.png"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority={true}
          quality={80}
          alt=""
        />
      </div>
      <form
        onSubmit={handleSignUp}
        className="flex flex-col w-96 min-w-fit rounded-xl bg-white p-10 gap-3 items-center z-10"
      >
        <Link href="/" className="flex items-center">
          <Image
            src="/logo_ii.svg"
            width="50"
            height="50"
            className=""
            alt=""
          />
          <span className="ml-2 mt-3 text-4xl uppercase pr-3">Rośliny</span>
        </Link>
        <div>{errorText}</div>
        <div className="text-lg">Create Your Account</div>
        <div className="text-sm">
          <div>Creating an account makes it easy to manage orders</div>
          <div>
            By creating an account, you agree to our{" "}
            <Link className="mx-0 text-blue-400" href="/signUp">
              Terms of Service
            </Link>
          </div>
        </div>
        <input
          type="name"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="rounded-md p-2 border border-gray-400 mt-3 input input-bordered"
        />
        <input
          type="name"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="rounded-md p-2 border border-gray-400 input input-bordered"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-md p-2 border border-gray-400 input input-bordered"
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
          Sign Up
        </button>
        <div className="mt-3">
          Have an account already?
          <div className="text-center">
            <Link className="mx-0 tracking-wider text-primary" href="/signIn">
              Sign In
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;

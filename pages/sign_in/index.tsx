import React, { use } from "react";

import { useState } from "react";
import { supabase } from "utils/supabase";
import { useRouter } from "next/router";
import { useUser } from "contexts/userContext";
import Button from "@mui/material/Button";
import Link from "next/link";
import Image from "next/image";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUser();

  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (data) {
      setUser(data.user);
      router.push("/"); // Redirect to home page
    } else {
      console.error("Sign-in error: ", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#A8AD9A]">
      <form
        onSubmit={handleSignIn}
        className="flex flex-col w-2/5 min-w-min rounded-xl bg-white p-10 gap-3 items-center"
      >
        <Link href="/" className="flex items-center">
          <span className="ml-2 text-4xl uppercase pr-3">Rośliny</span>
          <Image
            src="/logo_ii.svg"
            width="50"
            height="50"
            className=""
            alt=""
          />
        </Link>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-md p-2 border border-gray-400 mt-3"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-md p-2 border border-gray-400"
        />
        <Button variant="outlined" color="primary" type="submit">
          Sign In
        </Button>
        <div className="mt-3">
          No account?
          <Button variant="text" color="primary" type="submit" className="ml-3">
            Sign up
          </Button>
        </div>
      </form>
    </div>
  );
};
export default SignIn;

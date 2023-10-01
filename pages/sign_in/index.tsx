import React, { use } from "react";

import { useState } from "react";
import { supabase } from "utils/supabase";
import { useRouter } from "next/router";
import { useUser } from "contexts/userContext";

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
    <div className="flex justify-center">
      <form
        onSubmit={handleSignIn}
        className="flex flex-col w-2/5 bg-green-200 p-10 gap-3"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};
export default SignIn;

import Head from "next/head";
import { useEffect, useState } from "react";
import Gallery from "@/components/Gallery";
import HomeCarousel from "@/components/HomeCarousel";
import { supabase } from "../utils/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { useMessage } from "../contexts/messageContext";

export default function Home({ plants }) {
  const { message } = useMessage();

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex flex-col h-screen justify-between relative">
          <div className="fixed bottom-0 right-0 p-4 z-10">
            <AnimatePresence>
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5 }}
                  className="alert alert-success w-72"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>

                  <span>{message}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <HomeCarousel />
          <Gallery />
        </div>
      </main>
    </>
  );
}

export const getServerSideProps = async () => {
  const { data: plants } = await supabase.from("plants").select("*");

  return {
    props: {
      plants,
    },
  };
};

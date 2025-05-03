"use client";
import dynamic from "next/dynamic";

// Load Homepage without SSR
const Homepage = dynamic(() => import("./Homepage"), {
  ssr: false,
});

export default Homepage;

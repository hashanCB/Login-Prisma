"use client";
import React from "react";
import useStore from "./useStore";

const page = () => {
  const [state, setState] = useStore({ name: "name" });
  console.log(state);
  return (
    <div>
      <input
        type="text"
        value={state.name || state}
        onChange={(e) => setState(e.target.value)}
        placeholder="Enter your name"
      />
    </div>
  );
};

export default page;

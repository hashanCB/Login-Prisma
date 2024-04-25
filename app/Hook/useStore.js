"use client";
import React, { useState } from "react";

const useStore = ({ name }) => {
  const [state, setState] = useState(() => {
    {
      const value = localStorage.getItem(name);
      console.log(value);
      return value ? JSON.parse(value) : {};
    }
  });

  const setvaues = (newValue) => {
    setState((prev) => {
      const newState = { ...prev, [name]: newValue };
      localStorage.setItem(name, JSON.stringify(newValue));
      return newState; // Update the state correctly
    });
  };

  console.log(state);
  return [state, setvaues];
};

export default useStore;

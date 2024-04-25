"use client";
import React, { useEffect } from "react";

const TempImage = ({ urlToConfirm, funx }) => {
  console.log("Succufull Regidter");
  useEffect(() => {
    console.log("urlToConfirm", urlToConfirm);
    funx();
  }, []);
  return <div></div>;
};

export default TempImage;

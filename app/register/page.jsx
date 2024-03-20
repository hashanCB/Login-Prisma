"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Insertdata from "../api/register";

import * as yup from "yup";

import { useRouter } from "next/navigation";

const schema = yup.object().shape({
  username: yup.string().required("Please Enter value here"),
  email: yup
    .string()
    .required("plase enter email")
    .email("please enter valid email"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("Password is required"),
  repassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "password must match")
    .required("confim password is request"),
});

const page = () => {
  const [error, setError] = useState("");
  const router = useRouter(); // Use the useRouter hook here
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onsubmit = async (data) => {
    console.log(data.username, data.email);
    try {
      const respons = await Insertdata(data);
      if (respons.success) {
        setError("");
        console.log("Succufull Regidter");
        router.push("/");
      } else {
        setError(respons.message);
        console.log("fail Regidter");
      }
    } catch (error) {
      console.log("server error", error);
    }

    reset();
  };
  return (
    <div className=" max-w-max bg-orange-200 flex flex-col mx-auto mt-10">
      <form
        onSubmit={handleSubmit(onsubmit)}
        className=" mb-5 flex flex-col  max-w-max  items-center justify-center mx-10 space-y-2"
      >
        <label>username</label>
        <input
          type="text"
          placeholder="username"
          name="username"
          {...register("username")}
        />
        {errors.username?.message}

        <label>Email</label>
        <input
          type="email"
          placeholder="email"
          name="email"
          {...register("email")}
        />
        {errors.email?.message}

        <label>password</label>
        <input
          type="password"
          placeholder="password"
          name="password"
          {...register("password")}
        />
        {errors.password?.message}
        <label>re-password</label>
        <input
          type="password"
          placeholder="re-password"
          name="repassword"
          {...register("repassword")}
        />
        {errors.repassword?.message}

        <button
          type="submit"
          className="px-[10px]  rounded-md mx-3 bg-emerald-500 "
        >
          Register
        </button>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
};

export default page;

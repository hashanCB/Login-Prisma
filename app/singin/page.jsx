"use client";
import { signIn } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { getCsrfToken } from "next-auth/react";
const page = () => {
  const [error, setError] = useState();
  const route = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onsubmit = async (data) => {
    const respones = await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
    });

    if (respones?.error) {
      // Handle error scenario, show message to the user
      setError("Failed to sign in. Please check your credentials.");
    } else {
      // Optional: Redirect the user after a successful sign-in
      route.push("/");
      route.refresh();
    }
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

        <label>password</label>
        <input
          type="password"
          placeholder="password"
          name="password"
          {...register("password")}
        />
        {errors.password?.message}

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

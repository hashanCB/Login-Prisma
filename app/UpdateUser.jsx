"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { updateData } from "./api/register";

const UpdateUser = ({ value, Updatesceen }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});

  useEffect(() => {
    reset({
      username: value?.username ?? "",
      email: value?.email ?? "",
      id: value?.id ?? "",
    });
  }, [value, reset]);

  const onsubmit = async (data) => {
    const respons = await updateData(data);
    console.log(respons);

    Updatesceen();
    reset();
    return respons;
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onsubmit)}>
        <label>username</label>
        <input
          type="text"
          className=" border-2 border-red-400"
          name="username"
          {...register("username")}
        />
        <label>Email</label>
        <input
          type="text"
          className=" border-2 border-red-400"
          name="email"
          {...register("email")}
        />{" "}
        <input
          type="text"
          className=" border-2 border-red-400"
          name="id"
          hidden
          {...register("id")}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateUser;

"use client";
import React from "react";
import { DeletedData } from "../api/dashbordApi";
import { useForm } from "react-hook-form";
const DeletedDataa = ({ value }) => {
  const {
    register,
    handleSubmit,
    react,
    formState: { errors },
  } = useForm();

  const onsubmit = async (data) => {
    console.log(data);
    const respons = await DeletedData(data.id);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onsubmit)}>
        <input type="text" name="id" value={value} hidden {...register("id")} />
        <button type="submit"> Deleted</button>
      </form>
    </div>
  );
};

export default DeletedDataa;

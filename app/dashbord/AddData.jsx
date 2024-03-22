"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { GetdashbordApi, InsertData } from "../api/dashbordApi";

const schema = yup.object().shape({
  name: yup.string().required("plase enter name"),
  email: yup.string().email("plase enter email"),
});

const AddData = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onsubmit = async (data) => {
    const respons = await InsertData(data);
    console.log(respons);

    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onsubmit)}>
        <input
          type="text"
          placeholder="name"
          name="name"
          {...register("name")}
        />
        {errors && errors.name?.message}
        <input
          type="text"
          placeholder="email"
          name="email"
          {...register("email")}
        />
        {errors && errors.email?.message}
        <button type="submit"> Submit</button>
      </form>
    </div>
  );
};

export default AddData;

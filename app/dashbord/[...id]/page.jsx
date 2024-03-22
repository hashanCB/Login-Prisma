"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Updatedataa, GetSingalData } from "../../api/dashbordApi";
import { useRouter } from "next/navigation";

const schema = yup.object().shape({
  name: yup.string().required("plase enter name"),
  email: yup.string().email("plase enter email"),
});

const page = ({ params }) => {
  const [updatevalue, setupdatevalue] = useState();
  const routee = useRouter();
  const getvalue = async () => {
    const respones = await GetSingalData(params.id[0]);
    setupdatevalue(respones);
    reset({
      name: respones?.name ?? "",
      email: respones?.email ?? "",
      id: respones?.id ?? "",
    });
  };

  useEffect(() => {
    getvalue();
  }, [params]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onsubmit = async (data) => {
    const respons = await Updatedataa(data);
    if (respons.state) {
      console.log("ok");
      routee.push("/dashbord");
    }

    reset();
  };

  return (
    <div>
      <div>
        {params.name}
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

          <input type="text" name="id" hidden {...register("id")} />
          {errors && errors.email?.message}
          <button type="submit"> Update</button>
        </form>
      </div>
    </div>
  );
};

export default page;

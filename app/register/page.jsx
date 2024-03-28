"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Insertdata from "../api/register";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import * as yup from "yup";
import { useEdgeStore } from "../utils/edgestore";
import { useRouter } from "next/navigation";
import { SingleImageDropzone } from "../components/SingleImageDropzone";

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
    .oneOf([yup.ref("password"), null], "password must match"),
  // profileimage: yup
  //   .mixed()
  //   .test("fileRequired", "File is required", (value) => {
  //     return value && value.length > 0;
  //   })
  //   .test("fileSize", "File size is too large", (value) => {
  //     return value && value.length && value[0].size <= 1024 * 1024;
  //   })
  //   .test("fileType", "Unsupported file format", (value) => {
  //     return (
  //       value &&
  //       value.length &&
  //       ["image/jpeg", "image/png"].includes(value[0].type)
  //     );
  //   }),
});

const page = () => {
  const [error, setError] = useState("");
  const router = useRouter(); // Use the useRouter hook here
  const { edgestore } = useEdgeStore();
  const [file, setFile] = useState(null);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onsubmit = async (data) => {
    console.log(data);
    try {
      const Formimage = new FormData();
      Formimage.append("file", file);
      Formimage.append("username", data.username);
      Formimage.append("email", data.email);
      Formimage.append("password", data.password);
      const respons = await Insertdata(Formimage);
      const fuiles = data.file;
      console.log("balamko", file);
      if (fuiles) {
        const res = await edgestore.publicFiles.upload({
          file,
          onProgressChange: (progress) => {
            // you can use this to show a progress bar
            console.log(progress);
          },
        });
        // you can run some server action or api here
        // to add the necessary data to your database
        console.log(res);
      }
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
        className=" mb-5 flex flex-col w-[500px]  items-center justify-center mx-10 space-y-2"
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

        <label>Profile Image</label>
        {/* <input type="file" id="profileimage" {...register("profileimage")} /> */}
        <Controller
          name="file"
          control={control}
          render={({ field }) => (
            <SingleImageDropzone
              width={200}
              height={200}
              value={file} // Pass the current file state
              onChange={(newFile) => {
                setFile(newFile);
                field.onChange(newFile); // Update form state as well
              }}
            />
          )}
        />

        {errors.profileimage?.message}
        <br />
        <input
          className="px-[10px]  rounded-md mx-3 bg-emerald-500 "
          type="submit"
          value="Register"
        />

        {error && <div>{error}</div>}
      </form>
    </div>
  );
};

export default page;

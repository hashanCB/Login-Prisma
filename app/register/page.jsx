"use client";
import React, { useEffect, useState, useRef } from "react";
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
    .required("Please enter email")
    .email("Please enter a valid email"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("Password is required"),
  repassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match"),
});

const Page = () => {
  const [error, setError] = useState("");
  const router = useRouter(); // Use the useRouter hook here
  const { edgestore } = useEdgeStore();
  const [file, setFile] = useState(null);
  const [urlToConfirm, setUrlToConfirm] = useState(null);
  const [progress, setProgress] = useState();
  const buttonRef = useRef(null);

  const savefile = async () => {
    try {
      await edgestore.publicFiles.confirmUpload({
        url: urlToConfirm,
      });
    } catch (error) {
      console.log("Error confirming upload", error);
    }
  };
  useEffect(() => {
    if (urlToConfirm) {
      savefile();
    }
  }, [urlToConfirm]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const Formimage = new FormData();

      if (data.file) {
        const res = await edgestore.publicFiles.upload({
          file,
          options: {
            temporary: true,
          },
          onProgressChange: (progress) => {
            // You can use this to show a progress bar
            console.log(progress);
          },
        });

        await new Promise((resolve) => setTimeout(resolve, 1000));
        setProgress(res.url);
        Formimage.append("url", res.url);
      }

      Formimage.append("file", file);
      Formimage.append("username", data.username);
      Formimage.append("email", data.email);
      Formimage.append("password", data.password);
      const respons = await Insertdata(Formimage);

      if (respons.success) {
        setError("");
        setUrlToConfirm(Formimage.get("url"));
        console.log("Successful Register");

        // router.push("/");
      } else {
        setError(respons.message);
        console.log("Fail Register");
      }
    } catch (error) {
      console.log("Server error", error);
    }

    reset();
  };

  return (
    <div className="max-w-max bg-orange-200 flex flex-col mx-auto mt-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-5 flex flex-col w-[500px] items-center justify-center mx-10 space-y-2"
      >
        <label>Username</label>
        <input
          type="text"
          placeholder="Username"
          name="username"
          {...register("username")}
        />
        {errors.username?.message}
        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          name="email"
          {...register("email")}
        />
        {errors.email?.message}
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          name="password"
          {...register("password")}
        />
        {errors.password?.message}
        <label>Re-password</label>
        <input
          type="password"
          placeholder="Re-password"
          name="repassword"
          {...register("repassword")}
        />
        {errors.repassword?.message}

        <label>Profile Image</label>
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
        <br />
        <input
          className="px-[10px] rounded-md mx-3 bg-emerald-500"
          type="submit"
          value="Register"
        />

        {error && <div>{error}</div>}
      </form>

      <button
        ref={buttonRef}
        className="bg-white text-black rounded px-3 py-1 hover:opacity-80"
        onClick={async () => {
          console.log(urlToConfirm);

          await edgestore.publicFiles.confirmUpload({
            url: urlToConfirm,
          });
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default Page;

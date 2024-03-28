"use client";
import { useForm } from "react-hook-form";
import { uploadimagees } from "../api/imageupload";
import Image from "next/image";
export default function FileUpload() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("file", data.file[0]);
      const respons = await uploadimagees(formData);
      console.log(data.file[0]);
    } catch (error) {
      console.error("Error occurred while uploading file:", error);
    }
  };

  return (
    <div>
      <h1>File Upload</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="file" {...register("file")} />
        <button type="submit" disabled={isSubmitting}>
          Upload
        </button>
      </form>
      {isSubmitting && <p>Uploading...</p>}

      <Image
        src="/tmp/360_F_633455066_INyFUEQGW2iDKlwKlHPQGELsJIDpcm3G.jpg"
        width={100}
        height={100}
      />
    </div>
  );
}

"use client";

import { UploadButton } from "../utils/uploadthing";

import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import { useState } from "react";

export default function Home() {
  const [files, setFiles] = useState([]);
  return (
    <main className="flex min-h-screen flex-col ">
      <FilePond
        files={files}
        allowMultiple={true}
        maxFiles={3}
        // server="/api"
        credits={false}
        onupdatefiles={setFiles}
      />
      {console.log(files)}
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}

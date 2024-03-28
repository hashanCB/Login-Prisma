"use client";
import * as React from "react";
import { useEdgeStore } from "../utils/edgestore";
import { SingleImageDropzone } from "../components/SingleImageDropzone";

export default function Page() {
  const [file, setFile] = React.useState();
  const { edgestore } = useEdgeStore();
  return (
    <div>
      <SingleImageDropzone
        width={200}
        height={200}
        value={file}
        onChange={(file) => {
          setFile(file);
        }}
      />
      <button
        onClick={async () => {
          console.log(file);
          if (file) {
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
        }}
      >
        Upload
      </button>
    </div>
  );
}

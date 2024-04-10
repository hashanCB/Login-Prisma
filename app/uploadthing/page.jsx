"use client";

// import * as React from "react";
// import { useEdgeStore } from "../utils/edgestore";
// import { SingleImageDropzone } from "../components/SingleImageDropzone";

// export default function Page() {
//   const [file, setFile] = React.useState();
//   const { edgestore } = useEdgeStore();
//   return (
//     <div>
//       <SingleImageDropzone
//         width={200}
//         height={200}
//         value={file}
//         onChange={(file) => {
//           setFile(file);
//         }}
//       />
//       <button
//         onClick={async () => {
//           console.log(file);
//           if (file) {
//             const res = await edgestore.publicFiles.upload({
//               file,
//               onProgressChange: (progress) => {
//                 // you can use this to show a progress bar
//                 console.log(progress);
//               },
//             });
//             // you can run some server action or api here
//             // to add the necessary data to your database
//             console.log(res);
//           }
//         }}
//       >
//         Upload
//       </button>
//     </div>
//   );
// }
import { useOptimistic, useState, useRef } from "react";
import { deliverMessage } from "./actions.js";
import { m } from "framer-motion";

export default function App() {
  const formRef = useRef();
  const [messages, setMessages] = useState([{ text: "Hello there!" }]);

  const [optimisticMessages, addOptimisticMessage] = useOptimistic(messages);

  async function sendMessage(formData) {
    const sentMessage = await deliverMessage(formData.get("message"));
    setMessages((messages) => [...messages, { text: sentMessage }]);
  }

  async function formAction(formData) {
    addOptimisticMessage((prev) => [
      ...prev,
      { text: formData.get("message"), sending: true },
    ]);
    formRef.current.reset();
    await sendMessage(formData);
  }

  return (
    <>
      {optimisticMessages.map((message, index) => (
        <div
          key={index}
          className={message.sending ? "opacity-50" : "opacity-100"}
        >
          {message.text}
        </div>
      ))}
      <form action={formAction} ref={formRef}>
        <input type="text" name="message" placeholder="Hello!" />
        <button type="submit">Send</button>
      </form>
    </>
  );
}

import React from "react";
import { deleteData } from "./api/register";
import { revalidatePath } from "next/cache";

const AfterDeleted = ({ value, Deledtedupdate }) => {
  const deleteddata = async (value) => {
    const respones = await deleteData(value);
    console.log(value);
    Deledtedupdate();
    return respones;
  };

  return (
    <div>
      {" "}
      <button
        className=" bg-red-400 rounded-md p-2 shadow-lg"
        onClick={() => deleteddata(value)}
      >
        Deleted
      </button>
    </div>
  );
};

export default AfterDeleted;

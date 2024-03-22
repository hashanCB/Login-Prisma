"use server";
import React from "react";
import DeletedDataa from "./DeletedData";
import UpdateData from "./[...id]/page";
import Link from "next/link";

export const DisplayData = async () => {
  const respone = await fetch("http://localhost:3002/users", {
    next: {
      tags: ["LISY"],
    },
  });
  const result = await respone.json();

  return (
    <div>
      {result &&
        result.map((ele, index) => (
          <div key={ele.id}>
            {ele.name} <DeletedDataa value={ele.id} />
            <Link href={`./dashbord/${ele.id}/${ele.name}/${ele.email}`}>
              Update
            </Link>
            <div>===================== </div>
          </div>
        ))}
    </div>
  );
};

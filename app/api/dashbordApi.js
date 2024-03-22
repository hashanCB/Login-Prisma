"use server";

import { revalidateTag } from "next/cache";

export const InsertData = async (body) => {
  const respons = await fetch("http://localhost:3002/users", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ name: body.name, email: body.email }),
  });
  revalidateTag("LISY");

  return null;
};

export const GetSingalData = async (id) => {
  const respone = await fetch(`http://localhost:3002/users/${id}`, {
    cache: "no-cache",
  });
  const reuslt = await respone.json();

  return reuslt;
};

export const DeletedData = async (id) => {
  const respons = await fetch(`http://localhost:3002/users/${id}`, {
    headers: { "Content-Type": "application/json" },
    method: "DELETE",
  });
  revalidateTag("LISY");
  console.log(respons);
  return null;
};

export const Updatedataa = async (body) => {
  console.log(body);
  const respons = await fetch(`http://localhost:3002/users/${body.id}`, {
    headers: { "Content-Type": "application/json" },
    method: "PUT",
    body: JSON.stringify({ name: body.name, email: body.email }),
  });

  if (respons.ok) {
    revalidateTag("LISY");
    return { state: true };
  }
};

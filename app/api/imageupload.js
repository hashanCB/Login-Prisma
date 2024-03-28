"use server";
import { writeFile } from "fs/promises";
import { join } from "path";

export const uploadimagees = async (data) => {
  console.log(process.cwd());
  try {
    const bytes = await data.get("file").arrayBuffer();
    const buffer = Buffer.from(bytes);

    const path = join(process.cwd(), "public", "tmp", data.get("file").name);
    await writeFile(path, buffer);

    console.log(`File uploaded successfully to ${path}`);

    return { success: true };
  } catch (error) {
    console.log("you have Some error", error);

    let message = "An error occurred.";
    if (error.code === "P2002") {
      message = "Username or email already exists.";
    }
    return { success: false, message };
  }
};

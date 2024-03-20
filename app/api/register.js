"use server";
import { PrismaClient } from "@prisma/client";
import React from "react";

const Insertdata = async (data) => {
  try {
    const prisma = new PrismaClient();
    const respont = await prisma.regidter.create({
      data: {
        username: data.username,
        email: data.email,
        password: data.password,
      },
    });
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

export default Insertdata;

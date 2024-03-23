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

export const getAllData = async () => {
  try {
    const prisma = new PrismaClient();
    const allData = await prisma.regidter.findMany();
    return { success: true, data: allData };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { success: false, message: "Failed to fetch data." };
  }
};

export const deleteData = async (id) => {
  try {
    const prisma = new PrismaClient();
    await prisma.regidter.delete({
      where: { id },
    });
    return { success: true };
  } catch (error) {
    console.error("Error deleting data:", error);
    let message = "Failed to delete data.";
    if (error.code === "P2025") {
      message = "Data not found.";
    }
    return { success: false, message };
  }
};

export const updateData = async (data) => {
  try {
    const prisma = new PrismaClient();
    const updatedData = await prisma.regidter.update({
      where: { id: data.id },
      data: {
        username: data.username,
        email: data.email,
      },
    });
    return { success: true, data: updatedData };
  } catch (error) {
    console.error("Error updating data:", error);
    let message = "Failed to update data.";
    if (error.code === "P2025") {
      message = "Data not found.";
    }
    return { success: false, message };
  }
};

export default Insertdata;

"use server";

import db from "@/utils/db";
import {currentUser} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {imageSchema, productSchema, validateWithZodSchema} from "./schemas";
import {uploadImage} from "./supabase";

const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) redirect("/");
  return user;
};

const getAdminUser = async () => {
  const user = await getAuthUser();
  if (user.id !== process.env.ADMIN_USER_ID) redirect("/");
  return user;
};

const renderError = (error: unknown): {message: string} => {
  console.log(error);
  return {message: error instanceof Error ? error.message : "an error occurred"};
};

export const fetchFeaturedProducts = async () => {
  const products = await db.product.findMany({
    where: {
      featured: true,
    },
  });

  return products;
};

export const fetchAllProducts = ({search = ""}: {search: string}) => {
  return db.product.findMany({
    where: {
      OR: [
        {name: {contains: search, mode: "insensitive"}},
        {company: {contains: search, mode: "insensitive"}},
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const fetchSingleProduct = async (productId: string) => {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!product) redirect("/products");
  return product;
};

export const createProductAction = async (
  prevState: any,
  formData: FormData
): Promise<{message: string}> => {
  const user = await getAuthUser();
  try {
    const rawData = Object.fromEntries(formData);
    const file = formData.get("image") as File;
    const validatedFields = validateWithZodSchema(productSchema, rawData);
    const validatedFile = validateWithZodSchema(imageSchema, {image: file});
    const fullPath = await uploadImage(validatedFile.image);
    console.log(validatedFile);
    await db.product.create({
      data: {
        ...validatedFields,
        image: fullPath,
        clerkId: user.id,
      },
    });
  } catch (error) {
    return renderError(error);
  }
  redirect("/admin/products");
};

export const fetchAdminProducts = async () => {
  await getAdminUser();
  const products = await db.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return products;
};

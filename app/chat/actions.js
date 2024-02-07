"use server";

const { revalidatePath } = require("next/cache");

export default async function revalidateAll() {
  revalidatePath("/", "layout");
}

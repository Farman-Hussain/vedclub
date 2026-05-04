"use server";
import { client } from "@/sanity/client";

export async function submitQuery(formData: FormData) {
  try {
    // We create a special client that uses the secure token to write data
    const writeClient = client.withConfig({
      token: process.env.SANITY_API_TOKEN,
      useCdn: false,
    });

    await writeClient.create({
      _type: "query",
      name: formData.get("name"),
      phone: formData.get("phone"),
      type: formData.get("type"),
      message: formData.get("message"),
      status: "New",
      submittedAt: new Date().toISOString(),
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
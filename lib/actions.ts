"use server"

import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function createPost(data: FormData) {
  const title = data.get("title") as string;
  const content = data.get("content") as string;

  await prisma.post.create({
    data: {
      title,
      content,
    },
  });

  return { success: true };
}

export const submit = async (data: FormData) => {
  const res = await fetch("/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url: data.get('url') }),
  });
  return await res.json()
}

export const setEmbedCookies = (res: any) => {
  cookies().set('oEmbedHtml', res.response.html)
}
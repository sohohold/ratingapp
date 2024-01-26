"use server"

import { basename } from "path";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const domain = process.env.OEMBED_DOMAIN
const param = process.env.OEMBED_PARAMS

const postEmbedAPI = async (url: string) => {
  const endpoint = domain + encodeURIComponent(url) + param;
  const res = await fetch(endpoint);
  console.log(res);

  if (!res.ok) {
    throw new Error(`API request failed with status ${res.status}`);
  }
  return res;
};

const setCookieEmbed = async (json: any) => {
  cookies().set('embedHtml', json.html);
  cookies().set('postUrl', json.url);
  cookies().set('username', basename(json.auhor_url));
};

export const submit = async (data: FormData) => {
  const url = data.get('url') as string;
  const res = await postEmbedAPI(url);
  const json = await res.json();
  console.log('json type', typeof json)
  setCookieEmbed(json);
  revalidatePath('/');
};

export const getCookie = (name: string) => {
  const value = cookies().get(name)?.value;
  if (typeof value === 'string') {
    return value;
  } else {
    return ""
  }
}

export const createAuthor = async () => {
  const username = cookies().get('username')?.value as string;
  const createdAt = new Date();
  const updatedAt = new Date();

  await prisma.author.create({
    data: {
      username: username,
      createdAt: createdAt,
      updatedAt: updatedAt
    },
  });

  return { success: true };
}
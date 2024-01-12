// import fetch from "node-fetch";
import { NextRequest, NextResponse } from "next/server";

async function streamToString(readableStream: ReadableStream<Uint8Array>) {
    return new Response(readableStream).text();
 }

export const Post = async (req: NextRequest): Promise<NextResponse> => {
  if (req.method !== "POST") {
    return NextResponse.json({ message: "Method Not Allowed" });
  }
  if (req.body === null) {
    return NextResponse.json({ message: "Bad Request" });
  }
  let body = '';
  if (req.body instanceof ReadableStream) {
      body = await streamToString(req.body);
  } else {
      throw new Error('Expected a ReadableStream');
  }
  const parsedBody = JSON.parse(body);
  const tweetURL: string = parsedBody?.url;
  const publishTwitterAPIURL = `https://publish.twitter.com/oembed?url=`;
  const param = `&partner=&hide_thread=false`;
  const endpoint = publishTwitterAPIURL + encodeURIComponent(tweetURL) + param;
  const response = await fetch(endpoint);
  const resData = (await response.json());
  return NextResponse.json({ resData });
}
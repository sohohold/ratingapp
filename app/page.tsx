'use client'

import { Suspense, useState } from "react";
// import parse from "html-react-parser";
import { PostForm } from "@/components/forms";
import { Posts, PostsPlaceholder } from "@/components/posts";
import Loading from "./loading";
import { Card, CardHeader, CardBody } from "@nextui-org/card";

const Page = () => {

  return (
    <main className="flex min-h-screen flex-col items-center space-y-5 p-5 md:p-24">
      <h2>Rating</h2>
      <PostForm />
      <div className="grid gap-4 max-w-lg w-full">
        <div
          className="bg-white shadow-md rounded-md p-4 flex justify-between items-center"
        >
          <Card>
            <CardHeader className="text-lg font-bold">
            <small className="text-default-500">Post</small>
            </CardHeader>
            <CardBody className="text-gray-500">
              <Suspense fallback={<Loading />}>
                <Posts />
              </Suspense>
            </CardBody>
          </Card>
          <Card>
            <CardHeader className="text-lg font-bold">Average</CardHeader>
            <CardBody className="text-gray-500">TBD</CardBody>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default Page;

'use client'

import { useRef } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";

import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { setEmbedCookies, submit } from "@/lib/actions";
import { LoadingDots } from "./loading-dots";


export const PostForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  return (
    <form
      ref={formRef}
      action={(data) =>
        submit(data).then((res) => {
          setEmbedCookies(res);
          formRef.current?.reset();
          router.refresh();
        })
      }
      className="flex flex-col bg-white shadow-md rounded-md p-4 w-full max-w-lg space-y-4"
    >
      <Input
        type="text"
        name="url"
        placeholder="Enter URL you wish to evaluate"
        required
        isClearable
      />
      <FormButton />
    </form>
  );
}

const FormButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
    >
      {pending ? <LoadingDots className="" /> : <p>Submit</p>}
    </Button>
  );
};

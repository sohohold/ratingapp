'use client';

import { useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { CircularProgress } from '@nextui-org/react';

import { submit } from '@/lib/actions';

export const ActionsForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const clearClick = () => formRef.current?.reset();

  return (
    <form
      ref={formRef}
      action={(data) => {
        submit(data).then(() => {
          router.refresh();
        });
      }}
    >
      <div className="flex flex-row gap-2 items-center">
        <Input
          type='url'
          name="url"
          label="Enter URL you wish to evaluate"
          size="sm"
          variant="bordered"
          isClearable
          onClear={clearClick}
          className="shrink md:w-96"
        />
        <FormButton />
      </div>
    </form>
  );
};

const FormButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
    >
      {pending ? <CircularProgress aria-label='Loading...' size='sm' /> : <p>Submit</p>}
    </Button>
  );
};

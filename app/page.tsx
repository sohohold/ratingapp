'use server'

import { ActionsForm } from '@/components/forms';
import { EmbedResult } from '@/components/posts';

const TestIndex = () => {
  return (
    <main className="flex flex-col gap-4 items-center mt-10">
      <ActionsForm />
      <EmbedResult />
    </main>
  );
};

export default TestIndex;
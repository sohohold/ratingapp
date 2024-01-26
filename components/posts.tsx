import { Skeleton } from '@nextui-org/skeleton';
import prisma from '@/lib/prisma';
import { Embed } from './embed';
import { Chart } from './charts';

export const EmbedResult = () => {

  return (
    <div className="flex flex-col items-center md:flex-row md:justify-center gap-4 md:w-full">
      <div className="min-w-60 md:w-96">
        <Embed />
      </div>
      <div className='min-w-60 md:w-96'>
        <Chart />
      </div>
    </div>
  );
};

import { CircleDollarSign } from 'lucide-react';
import React from 'react';

export default function AdminNumbers() {
  return (
    <>

      <article className='flex justify-center gap-8'>
        {/* CARD 1 */}
        <div className='bg-[#dffae7] rounded-2xl py-8 px-6 flex  items-center flex-col w-[200px] '>
          {/* ICONE */}
          <div className='bg-[#22C55E] w-10 h-10 rounded-full flex justify-center items-center'>
            <CircleDollarSign className='text-white' />
          </div>
          <h2 className='mt-2 font-bold text-xl'>R$ 89.000,00</h2>
        </div>
        {/* CARD 1 */}
        <div className='bg-[#dffae7] rounded-2xl py-8 px-6 flex  items-center flex-col w-[200px] '>
          {/* ICONE */}
          <div className='bg-[#22C55E] w-10 h-10 rounded-full flex justify-center items-center'>
            <CircleDollarSign className='text-white' />
          </div>
          <h2 className='mt-2 font-bold text-xl'>R$ 89.000,00</h2>
        </div>

                {/* CARD 1 */}
        <div className='bg-[#dffae7] rounded-2xl py-8 px-6 flex  items-center flex-col w-[200px] '>
          {/* ICONE */}
          <div className='bg-[#22C55E] w-10 h-10 rounded-full flex justify-center items-center'>
            <CircleDollarSign className='text-white' />
          </div>
          <h2 className='mt-2 font-bold text-xl'>R$ 89.000,00</h2>
        </div>
                {/* CARD 1 */}
        <div className='bg-[#dffae7] rounded-2xl py-8 px-6 flex  items-center flex-col w-[200px] '>
          {/* ICONE */}
          <div className='bg-[#22C55E] w-10 h-10 rounded-full flex justify-center items-center'>
            <CircleDollarSign className='text-white' />
          </div>
          <h2 className='mt-2 font-bold text-xl'>R$ 89.000,00</h2>
        </div>
      </article>

    </>
  );
}
import React from 'react';
import Users from './components/Users';

export default function page() {
  return (
    <>
      <section className='lg:pt-40 pb-20'>
        <div className='maxW'>
          <Users />
        </div>
      </section>
    </>
  );
}
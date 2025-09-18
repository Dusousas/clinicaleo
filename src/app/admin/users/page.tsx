import React from 'react';
import Users from './components/Users';

export default function page() {
  return (
    <>
      <section className=''>
        <div className='maxW'>
          <Users />
        </div>
      </section>
    </>
  );
}
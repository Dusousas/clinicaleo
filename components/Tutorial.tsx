import Link from 'next/link';
import React from 'react';

const defaultTutorials = [
  {
    id: 1,
    number: "1",
    title: "Tutorial 1",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit quos maxime fuga mollitia commodi rerum iure, culpa aut nemo quidem? Repellendus quia hic culpa molestias."
  },
  {
    id: 2,
    number: "2",
    title: "Tutorial 2",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit quos maxime fuga mollitia commodi rerum iure, culpa aut nemo quidem? Repellendus quia hic culpa molestias."
  },
  {
    id: 3,
    number: "3",
    title: "Tutorial 3",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit quos maxime fuga mollitia commodi rerum iure, culpa aut nemo quidem? Repellendus quia hic culpa molestias."
  }
];

export default function Tutorial({ 
  sectionTitle = "Sobrancelhas perfeitas sem complicação",
  tutorials = defaultTutorials,
  buttonText = "Começar agora",
  buttonHref = "/questionario",
  maxWidth = "maxW",
  sectionPadding = "py-10 lg:py-20"
}) {
  return (
    <section className={sectionPadding}>
      <div className={maxWidth}>
        <h2 className='font-semibold text-3xl uppercase mb-12 text-center lg:text-left'>
          {sectionTitle}
        </h2>

        <article className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {tutorials.map((tutorial, index) => (
            <div key={tutorial.id || index} className='bg-[#F8F7F6] rounded-lg shadow-lg py-8 px-6 hover:shadow-xl transition-shadow duration-300'>
              <div className='flex items-center justify-center w-12 h-12 bg-textPrimary text-white rounded-full mb-4 font-bold uppercase text-xl font-Quicksand'>
                {tutorial.number}
              </div>
              <h3 className='font-Quicksand font-semibold text-xl text-textPrimary mb-3 uppercase'>
                {tutorial.title}
              </h3>
              <p className='text-gray-700 leading-relaxed'>
                {tutorial.description}
              </p>
            </div>
          ))}
        </article>

        <div className='flex mt-8 justify-center'>
          <Link 
            className='bg-textPrimary text-white px-6 py-2 rounded-xl uppercase tracking-wider font-Quicksand font-semibold' 
            href={buttonHref}
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
}
'use client';

import React, { JSX, useRef } from 'react';
import { FaChevronLeft, FaStar } from 'react-icons/fa';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Interface para o tipo de depoimento
interface Testimonial {
    id: number;
    name: string;
    text: string;
    rating: number;
}

const Testimonials: React.FC = () => {
    const swiperRef = useRef<SwiperType | null>(null);

    const testimonials: Testimonial[] = [
        {
            id: 1,
            name: 'Ana Laura',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis cupiditate possimus minus voluptate ut ullam commodi beatae laborum perferendis explicabo?',
            rating: 5
        },
        {
            id: 2,
            name: 'Pedro Silva',
            text: 'Excelente qualidade! O sabor é incrível e o atendimento foi excepcional. Super recomendo para quem busca produtos de qualidade.',
            rating: 5
        },
        {
            id: 3,
            name: 'Maria Santos',
            text: 'Fiquei impressionada com a rapidez na entrega e a qualidade dos produtos. Com certeza voltarei a comprar!',
            rating: 5
        },
        {
            id: 4,
            name: 'João Oliveira',
            text: 'Produtos frescos e saborosos! A experiência de compra foi maravilhosa do início ao fim.',
            rating: 5
        },
        {
            id: 5,
            name: 'Carla Mendes',
            text: 'Adorei! Os produtos superaram minhas expectativas. Já virei cliente fiel!',
            rating: 5
        }
    ];

    const handlePrev = (): void => {
        if (swiperRef.current) {
            swiperRef.current.slidePrev();
        }
    };

    const handleNext = (): void => {
        if (swiperRef.current) {
            swiperRef.current.slideNext();
        }
    };

    const renderStars = (rating: number): JSX.Element[] => {
        return Array.from({ length: rating }, (_, index) => (
            <FaStar key={index} className='text-yellow-400' />
        ));
    };

    return (
        <>
            <section className='bg-Azul/5 py-20'>
                <div className='maxW'>
                    <h3 className="font-Quicksand uppercase tracking-widest text-center font-semibold text-Laranja">
                        O que nossos clientes dizem
                    </h3>
                    <h1 className="font-Quicksand font-bold text-textPrimary text-center text-3xl lg:text-5xl">
                        Quem provou, Aprovou!
                    </h1>

                    <article className='mt-10'>
                        <div className='flex gap-5 justify-center mb-10'>
                            <FaChevronLeft 
                                className='text-Azul text-2xl cursor-pointer hover:opacity-70 transition-opacity' 
                                onClick={handlePrev}
                                aria-label="Slide anterior"
                            />
                            <FaChevronLeft 
                                className='rotate-180 text-Azul text-2xl cursor-pointer hover:opacity-70 transition-opacity' 
                                onClick={handleNext}
                                aria-label="Próximo slide"
                            />
                        </div>

                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            spaceBetween={30}
                            slidesPerView={1}
                            loop={true}
                            autoplay={{
                                delay: 4000,
                                disableOnInteraction: false,
                            }}

                            onSwiper={(swiper: SwiperType) => {
                                swiperRef.current = swiper;
                            }}
                            className="max-w-[600px] mx-auto"
                        >
                            {testimonials.map((testimonial: Testimonial) => (
                                <SwiperSlide key={testimonial.id}>
                                    <div className='bg-white py-16 px-10 rounded-2xl shadow'>
                                        <h4 className='text-textPrimary font-Quicksand font-semibold'>
                                            {testimonial.name}
                                        </h4>
                                        <p className='mt-6 text-sm font-light'>
                                            {testimonial.text}
                                        </p>
                                        <div className='mt-6 flex'>
                                            {renderStars(testimonial.rating)}
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </article>
                </div>
            </section>

          
        </>
    );
};

export default Testimonials;
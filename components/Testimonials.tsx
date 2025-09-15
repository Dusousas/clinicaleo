"use client"

import React from 'react';
import { FaStar } from 'react-icons/fa';

interface Testimonial {
    id: number;
    name: string;
    rating: number;
    text: string;
}

const Testimonials: React.FC = () => {
    const testimonials: Testimonial[] = [
        {
            id: 1,
            name: "Eduardo Sousa",
            rating: 5,
            text: "Excelente atendimento! A equipe é muito profissional e entregou exatamente o que prometeram. Recomendo para todos que buscam qualidade e seriedade."
        },
        {
            id: 2,
            name: "Maria Silva",
            rating: 5,
            text: "Superou minhas expectativas! O projeto foi entregue no prazo e com uma qualidade excepcional. Com certeza voltarei a contratar os serviços."
        },
        {
            id: 3,
            name: "Carlos Mendes",
            rating: 5,
            text: "Atendimento personalizado e resultado incrível! Desde o primeiro contato até a entrega final, tudo foi perfeito. Muito satisfeito com o trabalho."
        },
        {
            id: 4,
            name: "Ana Carolina",
            rating: 5,
            text: "Profissionais competentes e dedicados! Meu projeto ficou além do que imaginei. Parabéns pela excelência no trabalho e no atendimento."
        },
        {
            id: 5,
            name: "Roberto Lima",
            rating: 5,
            text: "Trabalho de altíssima qualidade! A comunicação foi clara durante todo o processo e o resultado final foi simplesmente perfeito. Muito obrigado!"
        }
    ];

    const [currentSlide, setCurrentSlide] = React.useState<number>(0);
    const [isAutoPlaying, setIsAutoPlaying] = React.useState<boolean>(true);
    const [isDragging, setIsDragging] = React.useState<boolean>(false);
    const [startX, setStartX] = React.useState<number>(0);
    const [currentTranslate, setCurrentTranslate] = React.useState<number>(0);
    const [prevTranslate, setPrevTranslate] = React.useState<number>(0);
    const [slidesToShow, setSlidesToShow] = React.useState<number>(3);
    
    const maxSlide: number = Math.max(0, testimonials.length - slidesToShow);

    const nextSlide = (): void => {
        setCurrentSlide((prev: number) => (prev >= maxSlide ? 0 : prev + 1));
    };

    const prevSlide = (): void => {
        setCurrentSlide((prev: number) => (prev <= 0 ? maxSlide : prev - 1));
    };

    const goToSlide = (index: number): void => {
        setCurrentSlide(index);
        setPrevTranslate(-index * (100 / slidesToShow));
        setCurrentTranslate(-index * (100 / slidesToShow));
    };

    // Handle responsive slides
    React.useEffect(() => {
        const updateSlidesToShow = () => {
            const width = window.innerWidth;
            if (width < 640) {
                setSlidesToShow(1); // Mobile: 1 slide
            } else if (width < 1024) {
                setSlidesToShow(2); // Tablet: 2 slides
            } else {
                setSlidesToShow(3); // Desktop: 3 slides
            }
        };

        updateSlidesToShow();
        window.addEventListener('resize', updateSlidesToShow);
        return () => window.removeEventListener('resize', updateSlidesToShow);
    }, []);

    // Reset slide position when slidesToShow changes
    React.useEffect(() => {
        const newMaxSlide = Math.max(0, testimonials.length - slidesToShow);
        if (currentSlide > newMaxSlide) {
            setCurrentSlide(newMaxSlide);
        }
    }, [slidesToShow, testimonials.length, currentSlide]);
    React.useEffect(() => {
        if (!isAutoPlaying || isDragging) return;
        
        const interval: NodeJS.Timeout = setInterval(nextSlide, 4000);
        return () => clearInterval(interval);
    }, [isAutoPlaying, isDragging]);

    // Update translate when slide changes
    React.useEffect(() => {
        if (!isDragging) {
            const newTranslate = -currentSlide * (100 / slidesToShow);
            setPrevTranslate(newTranslate);
            setCurrentTranslate(newTranslate);
        }
    }, [currentSlide, isDragging]);

    // Mouse events
    const handleMouseDown = (e: React.MouseEvent): void => {
        setIsDragging(true);
        setIsAutoPlaying(false);
        setStartX(e.clientX);
        e.preventDefault();
    };

    const handleMouseMove = (e: React.MouseEvent): void => {
        if (!isDragging) return;
        
        const currentX = e.clientX;
        const diff = currentX - startX;
        const translatePercentage = (diff / window.innerWidth) * 100;
        
        setCurrentTranslate(prevTranslate + translatePercentage);
    };

    const handleMouseUp = (): void => {
        if (!isDragging) return;
        
        setIsDragging(false);
        setIsAutoPlaying(true);
        
        const movedBy = currentTranslate - prevTranslate;
        const threshold = 10; // Minimum percentage to trigger slide change
        
        if (movedBy < -threshold && currentSlide < maxSlide) {
            setCurrentSlide(prev => prev + 1);
        } else if (movedBy > threshold && currentSlide > 0) {
            setCurrentSlide(prev => prev - 1);
        } else {
            // Snap back to current slide
            setCurrentTranslate(prevTranslate);
        }
    };

    // Touch events for mobile
    const handleTouchStart = (e: React.TouchEvent): void => {
        setIsDragging(true);
        setIsAutoPlaying(false);
        setStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent): void => {
        if (!isDragging) return;
        
        const currentX = e.touches[0].clientX;
        const diff = currentX - startX;
        const translatePercentage = (diff / window.innerWidth) * 100;
        
        setCurrentTranslate(prevTranslate + translatePercentage);
    };

    const handleTouchEnd = (): void => {
        handleMouseUp();
    };

    return (
        <section className="p-4 sm:p-6">
            <div className="bg-[#F5F1EE] rounded-xl py-20
            
            
            ">
                <div className="maxW px-4 sm:px-0">
                    <h2 className="font-bold text-2xl sm:text-3xl uppercase mt-2 text-textPrimary text-center  mb-8 sm:mb-10 lg:text-left">
                        O que nossos clientes dizem
                    </h2>

                    <div 
                        className="relative overflow-hidden cursor-grab active:cursor-grabbing"
                        onMouseEnter={() => !isDragging && setIsAutoPlaying(false)}
                        onMouseLeave={() => !isDragging && setIsAutoPlaying(true)}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        style={{ userSelect: 'none' }}
                    >
                        {/* Slides Container */}
                        <div 
                            className={`flex ${isDragging ? '' : 'transition-transform duration-500 ease-in-out'}`}
                            style={{ 
                                transform: `translateX(${currentTranslate}%)`,
                                pointerEvents: isDragging ? 'none' : 'auto'
                            }}
                        >
                            {testimonials.map((testimonial: Testimonial) => (
                                <div key={testimonial.id} className={`${
                                    slidesToShow === 1 ? 'w-full' : 
                                    slidesToShow === 2 ? 'w-1/2' : 'w-1/3'
                                } flex-shrink-0 px-2 sm:px-4`}>
                                    <article className="bg-white py-6 sm:py-8 px-4 sm:px-6 rounded-2xl shadow-lg h-full flex flex-col">
                                        {/* Stars */}
                                        <div className="flex text-yellow-400 justify-center gap-1 mb-3 sm:mb-4">
                                            {[...Array(testimonial.rating)].map((_, index: number) => (
                                                <FaStar key={index} className="w-4 h-4 sm:w-5 sm:h-5" />
                                            ))}
                                        </div>
                                        
                                        {/* Testimonial Text */}
                                        <p className="text-gray-700 text-center leading-relaxed mb-4 sm:mb-6 text-xs sm:text-sm flex-grow">
                                            "{testimonial.text}"
                                        </p>
                                        
                                        {/* Customer Name */}
                                        <h3 className="text-textPrimary font-bold text-center text-base sm:text-lg">
                                            {testimonial.name}
                                        </h3>
                                    </article>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-6 sm:mt-8 max-w-xs sm:max-w-md mx-auto px-4 sm:px-0">
                        <div className="w-full bg-gray-200 rounded-full h-1">
                            <div 
                                className="bg-texttext-textPrimary h-1 rounded-full transition-all duration-500"
                                style={{ width: `${maxSlide === 0 ? 100 : ((currentSlide + 1) / (maxSlide + 1)) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
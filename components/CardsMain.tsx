import React from 'react';
import { MdLocalPharmacy, MdSecurity, MdVerifiedUser, MdHealthAndSafety } from 'react-icons/md';

const defaultCards = [
    {
        id: 1,
        icon: MdLocalPharmacy,
        title: "Formulações Exclusivas, Aprovadas pela Anvisa",
        description: "Tratamentos elaborados e vendidos por farmácias de manipulação autorizadas pela Anvisa.",
        bgColor: "#3E5365"
    },
    {
        id: 2,
        icon: MdSecurity,
        title: "Segurança e Qualidade Garantidas",
        description: "Produtos desenvolvidos com os mais altos padrões de qualidade e segurança farmacêutica.",
        bgColor: "#3E5365"
    },
    {
        id: 3,
        icon: MdVerifiedUser,
        title: "Certificação Profissional",
        description: "Equipe especializada e certificada para desenvolvimento de medicamentos personalizados.",
        bgColor: "#3E5365"
    },
    {
        id: 4,
        icon: MdHealthAndSafety,
        title: "Atendimento Personalizado",
        description: "Cada formulação é desenvolvida especificamente para atender às necessidades individuais.",
        bgColor: "#3E5365"
    }
];

export default function CardsMain({
    cards = defaultCards,
    bgClass = "bgCardsmain",
    maxWidth = "maxW"
}) {

    return (
        <section className='p-6'>
            <div className={`${bgClass} py-4 rounded-xl`}>
                <div className={`${maxWidth} flex flex-col h-full items-center justify-center lg:flex-row`}>
                    {cards.map((card, index) => {
                        const IconComponent = card.icon;
                        return (
                            <div key={card.id || index} className='py-10 px-4 flex flex-col justify-center items-center lg:w-1/4'>
                                <div
                                    className='h-20 w-20 flex items-center justify-center rounded-3xl'
                                    style={{ backgroundColor: card.bgColor }}
                                >
                                    <IconComponent className='text-3xl text-white' />
                                </div>
                                <div
                                    className='border-[1px] w-[90%] my-6'
                                    style={{ borderColor: card.bgColor }}
                                />
                                <h4 className='text-lg uppercase text-center font-bold text-white font-Quicksand'>
                                    {card.title}
                                </h4>
                                <p className='mt-4 text-center text-gray-400'>
                                    {card.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
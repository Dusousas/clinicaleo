import { Link } from "lucide-react";

export default function CardsMain() {
    return (
        <section className='bg-Azul/5 pt-20'>
            <div className="maxW">
                <h3 className="font-Quicksand uppercase tracking-widest text-center font-semibold text-Laranja">Aprovado por mais de 100 mil pacientes</h3>
                <h1 className="font-Quicksand font-bold text-5xl text-textPrimary text-center"><span className="uppercase">Verté Beauty </span>é a evolução da consulta médica</h1>


                <article className="flex justify-center gap-20 items-center mt-20">
                    <div className="lg:w-1/2 flex justify-end">
                        <img src="/mockup-mobile.webp" alt="" />
                    </div>

                    <div className="lg:w-1/2">
                        <h2 className="text-3xl font-semibold ">Como funciona uma consulta médica via chat?</h2>
                        <p className="mt-2 text-gray-600">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus ipsa pariatur provident debitis hic fugiat!</p>

                        <div className="flex items-center mt-8 gap-2">
                            <div className="bg-Laranja w-10 h-10 flex justify-center items-center rounded-full  font-Quicksand font-bold">
                                <h3 className="text-white">1</h3>
                            </div>
                            <div>
                                <h3 className="font-semibold font-Quicksand text-textPrimary text-2xl">Responda o questionario</h3>
                            </div>
                        </div>
                        
                        <div className="flex items-center mt-3 gap-2">
                            <div className="bg-Laranja w-10 h-10 flex justify-center items-center rounded-full  font-Quicksand font-bold">
                                <h3 className="text-white">1</h3>
                            </div>
                            <div>
                                <h3 className="font-semibold font-Quicksand text-textPrimary text-2xl">Responda o questionario</h3>
                            </div>
                        </div>

                        
                        <div className="flex items-center mt-3 gap-2">
                            <div className="bg-Laranja w-10 h-10 flex justify-center items-center rounded-full  font-Quicksand font-bold">
                                <h3 className="text-white">1</h3>
                            </div>
                            <div>
                                <h3 className="font-semibold font-Quicksand text-textPrimary text-2xl">Responda o questionario</h3>
                            </div>
                        </div>
                        <div className="flex items-center mt-3 gap-2">
                            <div className="bg-Laranja w-10 h-10 flex justify-center items-center rounded-full  font-Quicksand font-bold">
                                <h3 className="text-white">1</h3>
                            </div>
                            <div>
                                <h3 className="font-semibold font-Quicksand text-textPrimary text-2xl">Responda o questionario</h3>
                            </div>
                        </div>

                     
                            <div className="mt-10">
                                <a className="bg-Laranja text-white px-10 py-4 rounded-2xl font-Quicksand tracking-wider uppercase font-semibold" href="/questionario">Começar tratamento</a>
                            </div>
                     


                    </div>
                </article>
            </div>
        </section>
    );
}
"use client"

import React, { useState, useEffect, JSX } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar(): JSX.Element {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
        return () => document.body.classList.remove("overflow-hidden");
    }, [isOpen]);

    const handleNavigation = (path: string, section?: string | null): void => {
        setIsOpen(false);

        if (path && path !== window.location.pathname) {
            if (section) {
                sessionStorage.setItem('scrollToSection', section);
            }
            window.location.href = path;
        }
        else if (section) {
            scrollToSection(section);
        }
    };

    const scrollToSection = (sectionId: string): void => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    useEffect(() => {
        const sectionToScroll: string | null = sessionStorage.getItem('scrollToSection');
        if (sectionToScroll) {
            sessionStorage.removeItem('scrollToSection');
            setTimeout(() => {
                scrollToSection(sectionToScroll);
            }, 100);
        }
    }, []);

    return (
        <>
            <div className="hidden lg:block">
                <nav>
                    <ul className="flex gap-6 items-center text-md uppercase tracking-widest text-white">
                        <li><button onClick={() => handleNavigation('/', 'home')} className="hover:opacity-70 transition-opacity uppercase cursor-pointer" type="button">Início</button></li>
                        <li><button onClick={() => handleNavigation('/', 'home')} className="hover:opacity-70 transition-opacity uppercase cursor-pointer" type="button">Produtos</button></li>
                        <li><button onClick={() => handleNavigation('/', 'home')} className="hover:opacity-70 transition-opacity uppercase cursor-pointer" type="button">Quem somos</button></li>
                    </ul>
                </nav>
            </div>

            <div className="lg:hidden">
                <button onClick={() => setIsOpen(!isOpen)} className="text-3xl text-white focus:outline-none relative z-50" type="button" aria-label={isOpen ? "Fechar menu" : "Abrir menu"}>{isOpen ? <FiX /> : <FiMenu />}</button>
                <nav className={`fixed top-0 right-0 h-screen w-full bg-white shadow-md z-40 flex flex-col items-center justify-center transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
                    <ul className="flex flex-col items-center gap-8 text-lg">
                        <li><button onClick={() => handleNavigation('/', 'home')} className="hover:opacity-70 transition-opacity uppercase cursor-pointer" type="button">Início</button></li>
                        <li><button onClick={() => handleNavigation('/', 'home')} className="hover:opacity-70 transition-opacity uppercase cursor-pointer" type="button">Produtos</button></li>
                        <li><button onClick={() => handleNavigation('/', 'home')} className="hover:opacity-70 transition-opacity uppercase cursor-pointer" type="button">Quem somos</button></li>
                        <li><button onClick={() => handleNavigation('/', 'home')} className="hover:opacity-70 transition-opacity uppercase cursor-pointer" type="button">Minha conta</button></li>
                        <li><button onClick={() => handleNavigation('/login', '')} className="hover:opacity-70 transition-opacity uppercase cursor-pointer" type="button">Minha conta</button></li>


                    </ul>
                </nav>
            </div>
        </>
    );
}
"use client"

import React, { useState, useEffect, JSX } from "react";
import { FiMenu, FiX, FiUser, FiLogOut, FiHome, FiUsers } from "react-icons/fi";
import { useRole } from '@/lib/hooks/useRole';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function Navbar(): JSX.Element {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { user } = useRole();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await authClient.signOut();
            toast.success("Logout realizado com sucesso!");
            router.push("/");
            setIsOpen(false);
        } catch (error) {
            console.error("Erro no logout:", error);
            toast.error("Erro ao fazer logout");
        }
    };

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
                        <li>
                            <button
                                onClick={() => handleNavigation('/', 'home')}
                                className="hover:opacity-70 transition-opacity uppercase cursor-pointer"
                                type="button"
                            >
                                Início
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => handleNavigation('/sobre-nos', 'Quem Somos')}
                                className="hover:opacity-70 transition-opacity uppercase cursor-pointer"
                                type="button"
                            >
                                Quem somos
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
            {/* moble menu */}
            <div className="lg:hidden">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-3xl text-Verde focus:outline-none relative z-50 p-2 hover:bg-white/10 rounded-full transition-all duration-200"
                    type="button"
                    aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
                >
                    {isOpen ? <FiX className="" /> : <FiMenu />}
                </button>

                {isOpen && (
                    <div
                        className="fixed inset-0 bg-black/80 z-30 transition-opacity duration-300"
                        onClick={() => setIsOpen(false)}
                    />
                )}


                <nav className={`fixed top-0 right-0 h-full w-90 max-w-full bg-gradient-to-b bg-Azul backdrop-blur-sm shadow-2xl z-40 flex flex-col transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"} overflow-y-auto`}>


                    <div className="flex items-center py-8 px-6 justify-between border-b border-Verde flex-shrink-0">
                        <h3 className="text-xl uppercase text-Verde font-semibold font-Quicksand italic">Verté</h3>
                    </div>


                    {user && (
                        <div className="px-6 py-4 bg-green-500/20 border-b border-white/10 flex-shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                                    <FiUser className="text-white text-lg" />
                                </div>
                                <div>
                                    <p className="text-white font-medium">Eduardo Sousa</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex-1 py-6 min-h-0">
                        <ul className="flex flex-col gap-2 px-4">
                            <li>
                                <button
                                    onClick={() => handleNavigation('/', 'home')}
                                    className="w-full flex items-center gap-4 px-4 py-3 hover:bg-white/10 transition-all duration-200 rounded-lg text-white text-left group"
                                    type="button"
                                >
                                    <FiHome className="text-xl group-hover:scale-110 transition-transform duration-200" />
                                    <span className="text-lg font-medium">Início</span>
                                </button>
                            </li>

                            <li>
                                <button
                                    onClick={() => handleNavigation('/sobre-nos', 'Quem somos')}
                                    className="w-full flex items-center gap-4 px-4 py-3 hover:bg-white/10 transition-all duration-200 rounded-lg text-white text-left group"
                                    type="button"
                                >
                                    <FiUsers className="text-xl group-hover:scale-110 transition-transform duration-200" />
                                    <span className="text-lg font-medium">Quem somos</span>
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div className="p-4 border-t border-white/20 bg-black/10 flex-shrink-0 mt-auto">
                        {user ? (
                            <div className="space-y-2">
                                <button
                                    onClick={() => handleNavigation('/account', '')}
                                    className="w-full flex items-center gap-4 px-4 py-3 transition-all duration-200 rounded-lg text-white text-left group bg-Azul"
                                    type="button"
                                >
                                    <FiUser className="text-xl group-hover:scale-110 transition-transform duration-200" />
                                    <span className="text-lg font-medium">Minha conta</span>
                                </button>

                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-4 px-4 py-3 transition-all duration-200 rounded-lg text-red-500 text-left group"
                                    type="button"
                                >
                                    <FiLogOut className="text-xl group-hover:scale-110 transition-transform duration-200" />
                                    <span className="text-lg font-medium">Sair</span>
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => handleNavigation('/login', '')}
                                className="w-full flex items-center gap-4 px-4 py-3 hover:bg-green-500/20 transition-all duration-200 rounded-lg text-green-300 hover:text-green-200 text-left group bg-green-500/10 border border-green-500/30"
                                type="button"
                            >
                                <FiUser className="text-xl group-hover:scale-110 transition-transform duration-200" />
                                <span className="text-lg font-medium">Fazer Login</span>
                            </button>
                        )}
                    </div>
                </nav>
            </div>
        </>
    );
}
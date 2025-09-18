"use client";

import React from 'react';
import { IoPerson, IoLogOut } from 'react-icons/io5';
import { useRole } from '@/lib/hooks/useRole';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function Login() {
    const { user, loading } = useRole();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await authClient.signOut();
            toast.success("Logout realizado com sucesso!");
            router.push("/");
        } catch (error) {
            console.error("Erro no logout:", error);
            toast.error("Erro ao fazer logout");
        }
    };

    if (loading) {
        return (
            <ul>
                <li className='hidden uppercase text-white lg:block'>
                    <span className='flex items-center gap-2'>
                        <IoPerson />
                        Carregando...
                    </span>
                </li>
            </ul>
        );
    }

    if (user) {
        return (
            <ul>
                <li className='hidden uppercase text-white lg:block'>
                    <div className='flex items-center gap-4'>
                        <a className='flex items-center gap-2 hover:opacity-70 transition-opacity' href="/account">
                            <IoPerson />
                            {user.name}
                        </a>
                        <button 
                            onClick={handleLogout}
                            className='flex items-center gap-2 hover:opacity-70 transition-opacity'
                            type="button"
                        >
                            <IoLogOut />
                            Sair
                        </button>
                    </div>
                </li>
            </ul>
        );
    }

    return (
        <ul>
            <li className='hidden uppercase text-white lg:block'>
                <a className='flex items-center gap-2 hover:opacity-70 transition-opacity' href="/login">
                    <IoPerson />
                    Entrar
                </a>
            </li>
        </ul>
    );
}
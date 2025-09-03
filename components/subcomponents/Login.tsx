import React from 'react';
import { IoPerson } from 'react-icons/io5';

export default function Login() {
    return (
        <>
            <ul>
                <li className='hidden uppercase text-white lg:block'><a className='flex items-center gap-2' href="/login"><IoPerson />Minha conta</a></li>
            </ul>
        </>
    );
}
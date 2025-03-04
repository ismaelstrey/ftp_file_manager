'use client'
import React from 'react'
import EmpresaList from './empresaList'
import EmpresaForm from './empresaForm'
import { FtpEmpresaType } from '@/app/types/FtpEmpresaType';
import { PiPlusFill } from 'react-icons/pi';
import useEmpresa from '@/hooks/useEmpresa';

export default function PageEmpresa() {

    const { addEmpresa, showForm, setShowForm } = useEmpresa()


    const handleFormSubmit = ({ empresa }: { empresa: FtpEmpresaType }): void => {
        addEmpresa(empresa);
    };

    return (
        <div className='flex flex-col justify-space-between gap-8 w-full min-h-screen'>
            <span className='flex justify-end'><PiPlusFill size={40} onClick={() => setShowForm(!showForm)} /></span>
            {showForm && <div className='fixed bg-black/80 top-0 left-0 w-full h-full z-50 justify-center items-center flex h-full'><EmpresaForm handleFormSubmit={handleFormSubmit} onClose={() => setShowForm(false)} /></div>}
            <div><EmpresaList /></div>
        </div>
    )
}

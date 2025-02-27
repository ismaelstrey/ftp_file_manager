'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaToggleOff } from 'react-icons/fa';

export default function EmpresaForm() {
    const [name, setName] = useState('');
    const [isActive, setIsActive] = useState(false);

    const toggleActive = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setIsActive(!isActive);
    };
    const salvarEmpresa = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        alert('Empresa salva com sucesso!');
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Formulário de Empresa</h1>
            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nome</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        placeholder="Digite o nome"
                    />
                </div>
                <div className="flex justify-end content-between w-full gap-4">
                    <div className='flex justify-between items-center '>
                        <button className='cursor-pointer' onClick={toggleActive}>{isActive ? <FaToggleOff size={30} className='fill-green-500' /> : <FaToggleOff size={30} className='fill-red-500 rotate-180' />}</button>
                    </div>

                    <motion.button
                        onClick={salvarEmpresa}
                        className={`p-2 rounded-md bg-blue-500 text-white`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        Salvar
                    </motion.button>
                </div>
            </form>
        </div>
    );
}



'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaToggleOff } from 'react-icons/fa';
import { FtpConnectionConfig } from '@/app/types/FtpServersTypes';

import { LuEye, LuEyeClosed } from 'react-icons/lu';
import { FtpEmpresaAllType } from '@/app/types/FtpEmpresaType';
import { useQuery } from '@tanstack/react-query';
import { on } from 'events';


export default function FtpServerForm({ handleFormSubmit }: { handleFormSubmit: ({ ftp }: { ftp: FtpConnectionConfig }) => void }) {
    const [name, setName] = useState('');
    const [host, setHost] = useState('');
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [ftp_empresaId, setFtp_empresaId] = useState<number>();
    const [active, setActive] = useState<boolean>(false);
    const [port, setPort] = useState<number>(21);
    const [showForm, setShowForm] = useState<boolean>(false);

    const getAllEmpresas = async (): Promise<FtpEmpresaAllType[]> => {
        const response = await fetch("/api/ftp_empresa");
        return response.json();
    };
    const { data: empresas } = useQuery({
        queryKey: ["ftpEmpresa"],
        queryFn: getAllEmpresas,
    });

    const toggleActive = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setActive(!active);
    };
    const ftp: FtpConnectionConfig = {
        name,
        host,
        username,
        password,
        active,
        port,
        ftp_empresaId
    }
    const salvarEmpresa = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        if (!name && !host && !username && !password) {
            return;
        }

        handleFormSubmit({ ftp })
    }




    return (
        <div>

            <button onClick={() => setShowForm(!showForm)} className=' text-green-500 flex justify-end w-full mt-4'>
                {
                    showForm ? <LuEye size={40} /> : <LuEyeClosed size={40} />

                }

            </button>
            {showForm &&
                <div>
                    <h1 className="text-2xl font-bold mb-4">Cadastro FTP Server</h1>

                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Empresa</label>
                            <select className="mt-1 block bg-zinc-800 w-full border border-gray-300 rounded-md shadow-sm p-2"
                                value={ftp_empresaId} onChange={(e) => setFtp_empresaId(parseInt(e.target.value))}
                            >
                                <option value="">Selecione uma empresa</option>
                                {
                                    empresas?.map((empresa, index) => (
                                        <option key={index} value={empresa.id}>{empresa.name}</option>
                                    ))
                                }

                            </select>
                        </div>
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
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Host</label>
                            <input
                                type="text"
                                value={host}
                                onChange={(e) => setHost(e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                placeholder="Digite o nome"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Usuario FTP</label>
                            <input
                                type="text"
                                name='ftpUser'
                                autoComplete='off'
                                value={username}
                                onChange={(e) => setUserName(e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                placeholder="Digite o nome"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                placeholder="Digite o nome"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Porta</label>
                            <input
                                type="number"
                                value={port}
                                onChange={(e) => setPort(Number(e.target.value))}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                placeholder="Digite o nome"
                            />
                        </div>
                        <div className="flex justify-end content-between w-full gap-4">
                            <div className='flex justify-between items-center '>
                                <label className="block text-sm font-medium text-gray-700 px-2">Status </label>
                                <button disabled className='cursor-pointer' onClick={toggleActive}>{active ? <FaToggleOff size={30} className='fill-green-500' /> : <FaToggleOff size={30} className='fill-red-500 rotate-180' />}</button>
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
            }
        </div>
    );
}



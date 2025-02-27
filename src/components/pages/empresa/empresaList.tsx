'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaServer, FaEye, FaEyeSlash, FaToggleOff } from 'react-icons/fa';

export default function EmpresaList() {
    const [empresas, setEmpresas] = useState([
        {
            "active": true,
            "name": "LP Informatica",
            "server": {
                "id": 1,
                "name": null,
                "host": "143.0.180.5",
                "port": 21,
                "username": "eletric",
                "password": "3letr1c2023!",
                "active": true,
                "createdAt": "2025-02-26T19:39:14.356Z"
            }
        }
    ]);

    const [showServer, setShowServer] = useState<boolean>(false);

    const toggleServer = (): void => {
        setShowServer(!showServer);
    };

    return (
        <div>
            <h1>EmpresaList</h1>
            <ul>
                {empresas.map((empresa, index) => (
                    <li key={index} className='border border-b-gray-400/50 p-4 bg-zinc-400/10 rounded-sm min-w-80' >
                        <h2>{empresa.name} </h2>
                        <div className='flex justify-between items-center border border-b-gray-400/50 p-4 rounded-full bg-zinc-400/10 shadow-sm shadow-emerald-300'>
                            <span><FaServer size={50} className={`${empresa.active ? 'fill-green-500' : 'fill-red-500'}`} /></span>
                            <p> {empresa.active ? <FaToggleOff size={30} className='fill-green-500' /> : <FaToggleOff size={30} className='fill-red-500' />}</p>
                        </div>
                        <div className='flex w-full justify-center content-center items-center'>
                            <span title={showServer ? 'Ocultar servidor' : 'Mostrar servidor'} className='cursor-pointer p-2' onClick={() => toggleServer()}>
                                {showServer ? <FaEyeSlash size={30} /> : <FaEye size={30} />}
                            </span>
                        </div>
                        {showServer && (
                            <div className='bg-white rounded-lg p-4'>
                                <h3>Servidor:</h3>
                                <p>ID: {empresa.server.id}</p>
                                <p>Host: {empresa.server.host}</p>
                                <p>Porta: {empresa.server.port}</p>
                                <p>Usuário: {empresa.server.username}</p>
                                <p>Senha: {empresa.server.password}</p>
                                <p>Criado em: {new Date(empresa.server.createdAt).toLocaleString()}</p>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}



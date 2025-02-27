'use client';
import React from 'react';
import { FaServer, FaToggleOff } from 'react-icons/fa';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FtpServerAllType } from '@/app/types/FtpServersTypes';
import axios from 'axios';
import toast from 'react-hot-toast';


export default function FtpList() {
    const queryClient = useQueryClient()
    const getAllFtpServers = async (): Promise<FtpServerAllType[]> => {
        const response = await fetch('/api/ftp_server');
        return response.json();
    }

    const { data: ftpServer } = useQuery({ queryKey: ['ftpServer'], queryFn: getAllFtpServers })
    const mutate = useMutation({
        mutationKey: ['ftpServer'],
        mutationFn: async (server: { active: boolean, id: number }) => {
            return axios.patch('/api/ftp_server', { id: server.id, active: server.active });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['ftpServer'] });
            toast.success('Servidor FTP atualizado com sucesso!');
        }
    });

    const toggleOlt = async (server: { active: boolean, id: number }) => {
        mutate.mutate(server);
    }

    return (
        <div className='container mx-auto p-32'>
            <h1>Ftp LIST</h1>
            <ul className='flex flex-wrap gap-4'>
                {ftpServer?.map(({ active, host, password, name, id }, index) => (
                    <li key={index} className='border border-b-gray-400/50 p-4 bg-zinc-400/10 rounded-sm min-w-80' >
                        <div className='flex justify-between items-center border border-b-gray-400/50 p-4 rounded-full bg-zinc-400/10 shadow-sm shadow-emerald-300'>
                            <span><FaServer size={50} className={`${active ? 'fill-green-500' : 'fill-red-500'}`} /></span>
                            <div className='text-small text-blue-500/50 hover:text-blue-500'>
                                <p>id# {id}</p>
                                <h2>Nome: {name} </h2>
                                <p>Host: {host}</p>
                                <p>Senha: {password}</p>
                            </div>
                            {
                                id &&
                                <button onClick={() => toggleOlt({ active: !active, id })}>
                                    {
                                        active
                                            ? <FaToggleOff size={30} className='fill-green-500' />
                                            : <FaToggleOff size={30} className='fill-red-500' />
                                    }
                                </button>
                            }
                        </div>
                        <div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}



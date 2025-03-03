'use client';
import React from 'react';
import { FaServer, FaToggleOff } from 'react-icons/fa';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FtpServerAllType } from '@/app/types/FtpServersTypes';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaTrash } from 'react-icons/fa6';


export default function FtpList() {
    const queryClient = useQueryClient()
    const getAllFtpServers = async (): Promise<FtpServerAllType[]> => {
        const response = await fetch('/api/ftp_server');
        return response.json();
    }

    const { data: ftpServer, isLoading } = useQuery({ queryKey: ['ftpServer'], queryFn: getAllFtpServers })
    const updateFtpServer = useMutation({
        mutationKey: ['ftpServer'],
        mutationFn: async (server: { active: boolean, id: number }) => {
            return axios.patch('/api/ftp_server', { id: server.id, active: server.active });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['ftpServer'] });
            toast.success('Servidor FTP atualizado com sucesso!');
        }
    });
    const deleteFtp = useMutation({
        mutationKey: ['ftpServer'],
        mutationFn: async (server: { id: number }) => {
            return axios.delete('/api/ftp_server', { data: { id: server.id } });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['ftpServer'] });
            toast.success('Servidor FTP deletado com sucesso!');
        }
    });

    const toggleOlt = async (server: { active: boolean, id: number }) => {
        updateFtpServer.mutate(server);
    }
    const deleteFtpServer = async (server: { id: number }) => {
        deleteFtp.mutate(server);
    }

    return (
        <div className='container mx-auto p-32'>
            <h1 className='text-2xl font-bold mb-8'>Lista de servidores FTP</h1>
            <ul className='flex flex-wrap gap-4'>
                {ftpServer?.map(({ active, host, password, name, id }, index) => (
                    <div key={index}>
                        <li className='p-4 rounded-sm min-w-80' >
                            <div className='flex justify-between items-center border-4 border-gray-400 p-4 rounded-full bg-zinc-400/10'>
                                <span><FaServer size={50} className={`${active ? 'fill-green-500' : 'fill-red-500'}`} /></span>
                                <div className='text-small text-white hover:text-blue-500 px-4'>
                                    <p>id# {id}</p>
                                    <h2>Nome: {name} </h2>
                                    <p>Host: {host}</p>
                                    <p>Senha: {password}</p>
                                </div>
                                <div className='flex gap-4 flex-col'>
                                    {
                                        id &&
                                        <button className='cursor-pointer hover:scale-110' title={active ? 'Desligar' : 'Ligar'} onClick={() => toggleOlt({ active: !active, id })}>
                                            {
                                                active
                                                    ? <FaToggleOff size={30} className='fill-green-500' />
                                                    : <FaToggleOff size={30} className='fill-red-500' />
                                            }
                                        </button>
                                    }
                                    {
                                        id && !active &&
                                        <button className='cursor-pointer hover:scale-110' title='Deletar' onClick={() => deleteFtpServer({ id })}>
                                            <FaTrash size={30} className='fill-red-500' />
                                        </button>
                                    }
                                </div>
                            </div>
                            <div>
                            </div>
                        </li>
                        <span></span>
                    </div>
                ))}
            </ul>
        </div>
    );
}



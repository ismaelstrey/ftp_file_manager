'use client'
import React from 'react'

import { FtpConnectionConfig } from '@/app/types/FtpServersTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import FtpServerForm from './ftpServerForm';
import FtpServerList from './ftpServerList';


export default function FtpServer() {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationKey: ['ftpServer', 'ftpEmpresa'],
        mutationFn: (server: FtpConnectionConfig) => {
            return axios.post('/api/ftp_server', server);
        },
        onSuccess: () => {
            toast.success('Servifdor FTP adicionado com sucesso!');
            queryClient.invalidateQueries({ queryKey: ['ftpServer', 'ftpEmpresa'] });
            queryClient.refetchQueries();

        },
    });

    const handleFormSubmit = ({ ftp }: { ftp: FtpConnectionConfig }): void => {
        mutation.mutate(ftp);
    };


    return (
        <div className=' w-full'>
            <FtpServerForm handleFormSubmit={handleFormSubmit} />
            <FtpServerList />
        </div>
    )
}

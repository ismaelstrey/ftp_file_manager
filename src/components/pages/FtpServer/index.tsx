'use client'
import React from 'react'
import FtpServerList from './ftpServerList'
import FtpServerForm from './ftpServerForm'
import { FtpConnectionConfig } from '@/app/types/FtpServersTypes';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';


export default function FtpServer() {
    const mutation = useMutation({
        mutationFn: (server: FtpConnectionConfig) => {
            return axios.post('/api/ftp_server', server);
        },
        onSuccess: () => {
            toast.success('Servifdor FTP adicionado com sucesso!');
        },
    });

    const handleFormSubmit = ({ ftp }: { ftp: FtpConnectionConfig }): void => {
        mutation.mutate(ftp);
    };


    return (
        <div>
            <FtpServerForm handleFormSubmit={handleFormSubmit} />
            <FtpServerList />
        </div>
    )
}

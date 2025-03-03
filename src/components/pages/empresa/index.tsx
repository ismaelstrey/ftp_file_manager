'use client'
import React from 'react'
import EmpresaList from './empresaList'
import EmpresaForm from './empresaForm'
import { useMutation, useQueryClient } from '@tanstack/react-query';

import axios from 'axios';
import toast from 'react-hot-toast';
import { FtpEmpresaType } from '@/app/types/FtpEmpresaType';

export default function PageEmpresa() {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationKey: ['ftpEmpresa'],
        mutationFn: (empresa: FtpEmpresaType) => {
            return axios.post('/api/ftp_empresa/new', empresa);
        },
        onSuccess: () => {
            toast.success('Servifdor FTP adicionado com sucesso!');
            queryClient.invalidateQueries({ queryKey: ['ftpEmpresa'] });

        },
    });

    const handleFormSubmit = ({ empresa }: { empresa: FtpEmpresaType }): void => {
        mutation.mutate(empresa);
    };
    return (
        <div>
            <div>PageEmpresa</div>

            <div><EmpresaForm handleFormSubmit={handleFormSubmit} /></div>
            <div><EmpresaList /></div>
        </div>
    )
}

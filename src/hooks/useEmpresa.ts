import { FtpEmpresaType } from "@/app/types/FtpEmpresaType";
import { BackupListAll } from "@/app/types/OltTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";



const fetchEmpresas = async (): Promise<BackupListAll | null | undefined> => {

    const oltName = 'OLT-HUAWEI-MA5800-AUXILIADORA';
    const response = await fetch(`/api/olts/bkp/${oltName}`);
    if (!response.ok) throw new Error(`Erro ao carregar dados da OLT ${oltName}`);
    return response.json();
};
const useEmpresa = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [showForm, setShowForm] = useState(false);

    const queryClient = useQueryClient()
    const { data: bkpOlt, error: bkpOltError } = useQuery({ queryKey: ['bkpOlt'], queryFn: fetchEmpresas });
    if (bkpOltError) console.error(bkpOltError);

    const adicionarEmpresa = useMutation({
        mutationKey: ['ftpEmpresa'],
        mutationFn: (empresa: FtpEmpresaType) => {
            return axios.post('/api/ftp_empresa/new', empresa);
        },
        onSuccess: () => {
            toast.success('Servifdor FTP adicionado com sucesso!');
            queryClient.invalidateQueries({ queryKey: ['ftpEmpresa'] });
            queryClient.refetchQueries();
            setIsLoading(false)
            setIsSuccess(true)
        },
    });

    const deletarEmpresa = useMutation({
        mutationKey: ['ftpEmpresa'],
        mutationFn: (id: number) => {
            return axios.delete('/api/ftp_empresa/new', { data: { id } });
        },
        onSuccess: () => {
            toast.success('Servifdor FTP dletado com sucesso!');
            queryClient.invalidateQueries({ queryKey: ['ftpEmpresa'] });
            queryClient.refetchQueries();
            setIsLoading(false)
            setIsSuccess(true)
        },
    });

    const addEmpresa = async (empresa: FtpEmpresaType) => {
        await adicionarEmpresa.mutate(empresa)
        setShowForm(false)

    };
    const deleteEmpresa = async (id: number) => {
        await deletarEmpresa.mutate(id)


    };

    return { bkpOlt, addEmpresa, isLoading, isSuccess, showForm, setShowForm, deleteEmpresa };
};




export default useEmpresa;

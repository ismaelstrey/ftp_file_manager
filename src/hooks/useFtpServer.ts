'use client';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";


type FtpServerType = {
    id: number;
    host: string;
    port: number;
    username: string;
    password: string;
    active: boolean;
    createdAt: string; // Pode ser Date se for convertido antes de usar
};

const fetchFtpServers = async (): Promise<FtpServerType[]> => {
    const response = await axios.get("/api/ftp_server");
    return response.data;
};

const updateFtpServer = async (value: { id: number, active: boolean }): Promise<FtpServerType> => {
    const response = await axios.patch("/api/ftp_server", { id: value.id, active: value.active });
    return response.data;
};


const useFtpServer = () => {
    const queryClient = useQueryClient();
    const { data: ftpServers = [], isLoading, error } = useQuery({
        queryKey: ['ftpServers'],
        queryFn: fetchFtpServers
    });

    const { mutate: toggleOlt } = useMutation<FtpServerType, Error, { id: number; active: boolean }>(

        {
            mutationFn: updateFtpServer,
            onSuccess: () => {
                console.log('Servidor FTP atualizado com sucesso!');
                queryClient.refetchQueries();
                queryClient.invalidateQueries({ queryKey: ['ftpServers'] });
            },
            onError: (error: Error) => {
                console.error('Erro ao atualizar servidor FTP:', error);
            },
        }
    );
    return { ftpServers, isLoading, error, toggleOlt };
};
export default useFtpServer;
'use client';
import { FtpServerAllType } from "@/app/types/FtpServersTypes";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";




const fetchFtpServers = async (): Promise<FtpServerAllType[]> => {
    const response = await axios.get("/api/ftp_server");
    const { data } = response;
    return data;
};

const updateFtpServer = async (value: { id: number, active: boolean }): Promise<FtpServerAllType> => {
    const response = await axios.patch("/api/ftp_server", { id: value.id, active: value.active });
    return response.data;
};


const useFtpServer = () => {
    const queryClient = useQueryClient();
    const { data: ftpServers = [], isLoading, error } = useQuery({
        queryKey: ['ftpServers'],
        queryFn: fetchFtpServers
    });

    const { mutate: toggleOlt } = useMutation<FtpServerAllType, Error, { id: number; active: boolean }>(

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

    const tooggleOlt = async (id: number, active: boolean) => await toggleOlt({ id, active });

    return { ftpServers, isLoading, error, tooggleOlt };
};
export default useFtpServer;
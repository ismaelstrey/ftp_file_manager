
import { FtpServerType } from "@/app/types/FtpServersTypes";
import { Olt } from "@/app/types/OltTypes";
import { useQuery } from "@tanstack/react-query";


const fetchDirectories = async (): Promise<FtpServerType[] | []> => {
    const response = await fetch('/api/ftp_directory');
    if (!response.ok) throw new Error('Erro ao carregar diretórios');
    return response.json();
};
const fetchFtpServer = async (): Promise<FtpServerType[] | []> => {
    const response = await fetch('/api/ftp_directory');
    if (!response.ok) throw new Error('Erro ao carregar diretórios');
    return response.json();
};

const fetchOlts = async (): Promise<Olt[] | []> => {
    const response = await fetch('/api/olts');
    if (!response.ok) throw new Error('Erro ao carregar dados das OLTs');
    return response.json();
};


const useFetch = () => {
    const { data: directories, error: directoriesError } = useQuery({ queryKey: ['directories'], queryFn: fetchDirectories });
    const { data: ftpServers, error: ftpServersError } = useQuery({ queryKey: ['ftpServers'], queryFn: fetchFtpServer });
    const { data: olts, error: oltsError } = useQuery({ queryKey: ['olts'], queryFn: fetchOlts });
    if (directoriesError) console.error(directoriesError);
    if (ftpServersError) console.error(ftpServersError);
    if (oltsError) console.error(oltsError);
    return { directories, olts, ftpServers };
};
export default useFetch;
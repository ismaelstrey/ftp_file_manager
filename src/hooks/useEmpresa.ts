import { BackupListAll } from "@/app/types/OltTypes";
import { useQuery } from "@tanstack/react-query";



const fetchEmpresas = async (): Promise<BackupListAll | null | undefined> => {

    const oltName = 'OLT-HUAWEI-MA5800-AUXILIADORA';
    const response = await fetch(`/api/olts/bkp/${oltName}`);
    if (!response.ok) throw new Error(`Erro ao carregar dados da OLT ${oltName}`);
    return response.json();
};
const useEmpresa = () => {
    const { data: bkpOlt, error: bkpOltError } = useQuery({ queryKey: ['bkpOlt'], queryFn: fetchEmpresas });
    if (bkpOltError) console.error(bkpOltError);
    return { bkpOlt };
};
export default useEmpresa;

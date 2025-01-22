'use client'
import { BackupListAll, Olt } from "@/app/types/OltTypes";
import { useEffect, useState } from "react";

interface UseFetchReturn {
    directories: any[];
    loading: boolean;
    stats: {
        totalDirs: number;
        totalOlts: number;
        lastBackup: string;
        successRate: string;
    };
    fetchDataDiretorios: () => Promise<void>;
    fetchDataOlts: () => Promise<Olt[] | []>;
    fetchDataOltBkp: (data?: Olt[]) => Promise<void>;
    olts?: Olt[];
    backup?: BackupListAll[];
    error: Error | null;
}

const useFetch = (): UseFetchReturn => {
    const [directories, setDirectories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [olts, setOlts] = useState<Olt[]>([]);
    const [backup, setBackup] = useState<BackupListAll[]>();
    const [error, setError] = useState<Error | null>(null);
    const [stats, setStats] = useState({
        totalDirs: 0,
        totalOlts: 0,
        lastBackup: '',
        successRate: '0%',
    });

    const fetchDataOlts = async () => {
        try {
            const response: Olt[] = await fetch('/api/olts').then(res => res.json());
            if (!response) {
                throw new Error('Falha ao carregar dados das OLTs');
            }
            const data = await response;
            setOlts(data);
            return data;
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Erro desconhecido'));
            return [];
        }
    };

    const fetchDataOltBkp = async (data?: Olt[]) => {
        try {
            const oltsToFetch = data || olts;
            const backupPromises = oltsToFetch.map(async (olt) => {
                const response: BackupListAll = await fetch('/api/olts/bkp/' + olt.name).then(res => res.json());
                return response;
            });

            const responses = await Promise.all(backupPromises);
            setBackup(responses);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Erro ao carregar backups'));
        }
    };

    const fetchDataDiretorios = async () => {
        try {
            const response = await fetch('/api/diretorios');
            const dirs = await response.json();
            setDirectories(dirs);
            setStats(prev => ({
                ...prev,
                totalOlts: olts.length,
                totalDirs: dirs.length
            }));
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Erro ao carregar diretórios'));
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const data = await fetchDataOlts();
            await fetchDataOltBkp(data);
            console.log(backup);
            // await fetchDataDiretorios();
            setLoading(false);
        };

        fetchData();
    }, []); // Execute apenas uma vez ao montar o componente

    return {
        directories,
        loading,
        stats,
        fetchDataDiretorios,
        fetchDataOlts,
        fetchDataOltBkp,
        olts,
        backup,
        error
    };
};

export default useFetch;
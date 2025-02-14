'use client'

import { FtpServerType } from '@/app/types/FtpServersTypes';
import { BackupListAll, Olt } from '@/app/types/OltTypes';
import useFetch from '@/hooks/useFetch';
import useFtpServer from '@/hooks/useFtpServer';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';


interface OltContextType {
    state: any;
    olts?: Olt[];
    backup?: BackupListAll[];
    setState: (state: any) => void;
    ftpServers: FtpServerType[];
    togleOlt: (id: number, active: boolean) => Promise<void>;
}
// Criação do contexto
const OltContext = createContext<OltContextType | undefined>(undefined);

// Provedor do contexto
export const OltProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState({});
    const { olts, backup, fetchDataOltBkp, fetchDataOlts } = useFetch();
    const { ftpServers, handleTogleOlt, getAllFtpServer } = useFtpServer();

    const togleOlt = async (id: number, active: boolean) => {
        await handleTogleOlt(id, active);
        await getAllFtpServer();
        await fetchDataOltBkp();
        await fetchDataOlts();

    };

    useEffect(() => {

        console.log(backup);
    }, [ftpServers, backup]);

    // Estado inicial


    return (
        <OltContext.Provider value={{ state, olts, backup, setState, ftpServers, togleOlt }}>
            {children}
        </OltContext.Provider>
    );
};

// Hook personalizado para usar o contexto
export const useOltContext = () => {
    const context = useContext(OltContext);
    if (!context) {
        throw new Error('useOltContext deve ser usado dentro de um OltProvider');
    }
    return context;
};

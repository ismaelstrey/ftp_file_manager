'use client';
import { FtpServerType } from "@/app/types/FtpServersTypes";
import { Olt } from "@/app/types/OltTypes";
import useFetch from "@/hooks/useFetch";
import useFtpServer from "@/hooks/useFtpServer";
import React, { createContext, useContext, ReactNode } from 'react';

interface OltContextType {
    olts?: Olt[];
    ftpServers?: FtpServerType[];
    directories?: FtpServerType[] | [];
    toggleOlt: (id: number, active: boolean) => Promise<void>;
}
// Create context
const OltContext = createContext<OltContextType | undefined>(undefined);
// Provider component
export const OltProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { olts, directories, ftpServers } = useFetch();
    console.log(olts)
    const { toggleOlt: handleToggleOlt } = useFtpServer();
    const toggleOlt = async (id: number, active: boolean) => await handleToggleOlt({ id, active });
    return (
        <OltContext.Provider value={{ olts, ftpServers, toggleOlt, directories }}>
            {children}
        </OltContext.Provider>
    );
};
// Custom hook to use the context
export const useOltContext = () => {
    const context = useContext(OltContext);
    if (!context) {
        throw new Error('useOltContext must be used within an OltProvider');
    }
    return context;
};

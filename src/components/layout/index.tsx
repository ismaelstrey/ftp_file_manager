'use client'
import { OltProvider } from '@/context/OltContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider, useTheme } from 'next-themes'
import React, { useEffect } from 'react'
import { Toaster } from 'react-hot-toast';
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 minutos (tempo antes de ser considerado "desatualizado")
            refetchOnMount: false, // Não refazer a query ao montar o componente
            refetchOnWindowFocus: false, // Não refazer a query ao alternar a aba
            refetchOnReconnect: false, // Não refazer a query ao reestabelecer a conexão
            gcTime: 10 * 60 * 1000, // 10 minutos
        },
    },
});

export default function Main({ children }: { children: React.ReactNode }) {

    return (
        <ThemeProvider defaultTheme={'light'} attribute={'data-theme'} >
            <div className="flex w-full min-h-screen antialiased">

                <Toaster />
                <QueryClientProvider client={queryClient}>
                    <OltProvider>
                        {children}
                    </OltProvider>
                </QueryClientProvider>

            </div>
        </ThemeProvider>

    )
}

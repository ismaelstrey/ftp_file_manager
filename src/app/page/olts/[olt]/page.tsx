'use client';
import OltDetails from '@/components/dashboard/OltDetails';
import useFetch from '@/hooks/useFetch'
import { use } from 'react';

interface PageParams {
    params: Promise<{ olt: string }>
};


export default function PageOLT({ params }: PageParams) {
    const { loading, backup } = useFetch();
    const { olt } = use(params)
    const oltName = backup?.find(oltFilter => oltFilter.olt === olt);

    return (
        <main className="ml-64 p-8">
            <h1 className="text-2xl font-bold mb-8">OLTs {olt}</h1>
            {loading || !oltName ? 'Carregando...' :
                <OltDetails oltData={oltName} />}
        </main>
    )
}

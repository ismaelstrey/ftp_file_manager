'use client';
import { Backup } from '@/app/types/OltTypes';
import OltDetails from '@/components/dashboard/OltDetails';
import useFetch from '@/hooks/useFetch'
import { use } from "react";

export default function PageOLT({ params }: { params: { olt: string } }) {
    const { olt }: { olt: string } = use(params as any);
    const { loading, backup } = useFetch();

    const oltName = backup?.find(oltFilter => oltFilter.olt === olt);

    return (
        <main className="ml-64 p-8">
            <h1 className="text-2xl font-bold mb-8">OLTs {olt}</h1>
            {loading || !oltName ? 'Carregando...' :
                <OltDetails oltData={oltName} />}
        </main>
    )
}

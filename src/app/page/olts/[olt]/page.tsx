'use client';
import OltDetails from '@/components/dashboard/OltDetails';
import { useQuery } from '@tanstack/react-query';
import { use } from 'react';
interface PageParams {
    params: Promise<{ olt: string }>
};
export default function PageOLT({ params }: PageParams) {
    const { olt } = use(params)
    const { isPending, error, data: bkpOlt } = useQuery({
        queryKey: ['oltName', olt],
        queryFn: () =>
            fetch(`/api/olts/bkp/${olt}`).then((res) =>
                res.json(),
            ),
    },
    )
    if (isPending) return `${olt} Loading...`
    if (error) return 'An error has occurred: ' + error.message
    return (
        <main className="pt-8">
            <h1 className="text-2xl font-bold mb-8">OLTs {olt}</h1>
            {isPending || !bkpOlt ? 'Carregando...' :
                <OltDetails oltData={bkpOlt} />}
        </main>
    )
}

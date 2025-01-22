'use client'
import OltList from '@/components/dashboard/OltList'
import useFetch from '@/hooks/useFetch'

export default function PageOLT() {
    const { backup } = useFetch();
    return (
        <main className="ml-64 p-8">
            <h1 className="text-2xl font-bold mb-8">OLTs</h1>
            {backup ? <OltList olts={backup} /> : 'Carregando...'}

        </main>
    )
}

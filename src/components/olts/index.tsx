"use client";
import { Olt } from "@/app/types/OltTypes";
import OltList from "@/components/dashboard/OltList";
import OltMenu from "@/components/olts/menu";
import useOlt from "@/hooks/useOlt";
import useFtpServer from "@/hooks/useFtpServer";

export default function PageOlt() {
    const { ftpServers, tooggleOlt } = useFtpServer();
    const { olts } = useOlt()

    const filtra = ftpServers?.filter((list) => list.active === true);
    console.log(olts)
    return (
        <main className=" p-8 flex w-full flex-col">
            <h1 className="text-2xl font-bold mb-8">
                OLTs / {filtra && filtra[0]?.name} / {filtra && filtra[0]?.host}
            </h1>
            <OltMenu ftpServers={ftpServers} togleOlt={tooggleOlt} />
            <div className=" flex flex-col bg-white rounded-xl shadow-xs p-6 gap-4">
                <div className='flex justify-between'>
                    <h2 className="text-xl font-semibold mb-4">Olts monitoradas </h2>
                    <span>Total: {olts?.length}</span>
                </div>
                {olts ? olts.map((olt: Olt, key) => <OltList key={key} olts={olt.name} />) : ''}
            </div>
        </main>
    );
}

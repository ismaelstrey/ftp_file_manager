"use client";
import {
  ClockIcon,
  CheckCircleIcon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";
import StatusCard from "@/components/dashboard/StatusCard";
import Link from "next/link";
import useFetch from "@/hooks/useFetch";
import useFtpServer from "@/hooks/useFtpServer";

export default function Dashboard() {
  const { olts } = useFetch();
  const { ftpServers } = useFtpServer();
  const ftpServerAtivo = ftpServers.filter(({ active }) => active);

  return (
    <main className="ml-64 p-8">
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link href="/page/olts">
          <StatusCard
            title="Total de OLTs"
            value={olts?.length}
            icon={<TableCellsIcon className="h-8 w-8" />}
            color="bg-blue-500"
          />
        </Link>
        <StatusCard
          title={`FTP SERVERS || Servidor Ativo ${ftpServerAtivo[0].host}`}
          value={ftpServers?.length}
          icon={<ClockIcon className="h-8 w-8" />}
          color="bg-green-500"
        />
        <StatusCard
          title="Taxa de Sucesso"
          value={"N/A"}
          icon={<CheckCircleIcon className="h-8 w-8" />}
          color="bg-purple-500"
        />
      </div>
    </main>
  );
}

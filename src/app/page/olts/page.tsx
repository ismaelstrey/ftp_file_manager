"use client";
import OltList from "@/components/dashboard/OltList";
import OltMenu from "@/components/olts/menu";
import useFetch from "@/hooks/useFetch";
import useFtpServer from "@/hooks/useFtpServer";

export default function PageOLT() {
  const { backup } = useFetch();
  const { ftpServers, togleOlt } = useFtpServer();
  const filtra = ftpServers.filter((list) => list.active === true);

  return (
    <main className="ml-64 p-8">
      <h1 className="text-2xl font-bold mb-8">
        OLTs {filtra && filtra[0]?.host}{" "}
      </h1>
      <OltMenu ftpServers={ftpServers} togleOlt={togleOlt} />
      {backup ? <OltList olts={backup} /> : "Carregando..."}
    </main>
  );
}

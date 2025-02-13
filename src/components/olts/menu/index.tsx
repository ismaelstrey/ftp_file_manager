import { FtpServerType } from "@/app/types/FtpServersTypes";

import React from "react";

export default function OltMenu({
  ftpServers,
  togleOlt,
}: {
  ftpServers?: FtpServerType[];
  togleOlt: (id: number, active: boolean) => void;
}) {
  return (
    <div className="flex w-full gap-2 mb-4">
      {ftpServers?.map(({ name, id, active }) => (
        <div
          onClick={() => id && togleOlt(id, !active)}
          key={id}
          className={`flex p-1 rounded-lg bolder text-sm cursor-pointer transition-all hover:text-zinc-800 hover:scale-110 ${active ? "bg-lime-400" : "bg-blue-500"
            }`}
        >
          {name}
        </div>
      ))}
    </div>
  );
}

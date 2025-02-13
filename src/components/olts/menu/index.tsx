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
          className={`flex p-1 border border-solid border-zinc-600 rounded-lg bolder text-zinc-100 text-md cursor-pointer transition-all hover:text-zinc-800 hover:scale-110 ${active ? "bg-primary-gradient" : "bg-secondary-gradient"
            }`}
        >
          {name}
        </div>
      ))}
    </div>
  );
}

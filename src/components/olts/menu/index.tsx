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
    <div className="flex w-full gap-2 ">
      {ftpServers?.map(({ name, id, active }) => (
        <div
          onClick={() => id && togleOlt(id, !active)}
          key={id}
          className={`flex p-2 rounded-lg text-base cursor-pointer ${
            active ? "bg-lime-400" : "bg-orange-400"
          }`}
        >
          {name}
        </div>
      ))}
    </div>
  );
}

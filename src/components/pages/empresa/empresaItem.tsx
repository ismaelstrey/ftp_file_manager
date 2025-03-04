import { FtpEmpresaAllType } from "@/app/types/FtpEmpresaType";
import React, { useState } from "react";
import { FaServer, FaToggleOff } from "react-icons/fa";
import { motion } from "motion/react";
import ServerFtpItem from "../FtpServer/_ftpItem";

export default function EmpresaItem({
  empresa,
}: {
  empresa: FtpEmpresaAllType;
}) {
  const [showServer, setShowServer] = useState<boolean>(false);
  const toggleServer = (): void => {
    setShowServer(!showServer);
  };
  return (
    <div className=" min-w-80">
      <h2>{empresa.name} </h2>
      <div
        onClick={() => toggleServer()}
        className="flex  z-10 relative justify-between items-center border border-gray-400/50 p-4 rounded-full bg-zinc-800 "
      >
        <span>
          <FaServer
            size={50}
            className={`${empresa.active ? "fill-green-500" : "fill-red-500"}`}
          />
        </span>
        <p>
          {" "}
          {empresa.active ? (
            <FaToggleOff size={30} className="fill-green-500" />
          ) : (
            <FaToggleOff size={30} className="fill-red-500" />
          )}
        </p>
        <p> {empresa.active ? "Ativo" : "Inativo"}</p>
        <span
          title="Quantidade de servidores"
          className=" w-8 h-8 flex justify-center items-center rounded-full bg-gray-900 text-white font-semibold"
        >
          {empresa.ftp_server?.length}
        </span>
      </div>
      {empresa?.ftp_server && empresa?.ftp_server.length > 0 && (
        <div className="">
          {showServer && (
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ duration: 0.8 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-zinc-800 z-0 rounded-2xl border border-gray-400/50 -mt-10"
            >
              <div className="rounded-lg">
                {empresa.ftp_server.map((server, index) => (
                  <ServerFtpItem key={index} {...server} />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}

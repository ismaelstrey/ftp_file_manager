import { FtpEmpresaAllType } from "@/app/types/FtpEmpresaType";
import React, { useState } from "react";
import { FaServer, FaToggleOff, FaTrashAlt } from "react-icons/fa";
import { motion } from "motion/react";
import ServerFtpItem from "../FtpServer/_ftpItem";
import useEmpresa from "@/hooks/useEmpresa";
import { MdOutlineDoubleArrow } from "react-icons/md";

export default function EmpresaItem({
  empresa,
}: {
  empresa: FtpEmpresaAllType;
}) {
  const [showServer, setShowServer] = useState<boolean>(false);
  const { deleteEmpresa, tooggleEmpresa } = useEmpresa()
  const toggleServer = (): void => {
    setShowServer(!showServer);
  };
  return (
    <div className=" min-w-80">

      <div

        className="flex flex-col z-10 relative bg-black  border border-gray-400/50 p-4 rounded-full "
      >
        <span className="flex justify-between p-4">
          <h2 className="text-2xl font-semibold text-center">{empresa.name} </h2>
          {empresa.id && <FaTrashAlt title={`Deletar empresa ${empresa.name}`} className=" cursor-pointer text-red-500 hover:scale-110" size={30} onClick={() => deleteEmpresa(empresa?.id || 0)} />}

        </span>
        <div className="flex w-full gap-2 justify-around items-center">
          <span>
            <FaServer
              size={50}
              className={`${empresa.active ? "fill-green-500" : "fill-red-500"}`}
            />
          </span>
          <p>
            {" "}
            {empresa.active ? (
              <FaToggleOff onClick={() => tooggleEmpresa(empresa?.id || 0, false)} size={30} className="fill-green-500 cursor-pointer" />
            ) : (
              <FaToggleOff onClick={() => tooggleEmpresa(empresa?.id || 0, true)} size={30} className="fill-red-500  cursor-pointer" />
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
        {empresa.ftp_server?.length > 0 && <span className="flex cursor-pointer justify-center -mb-6">
          <MdOutlineDoubleArrow onClick={() => toggleServer()} title={showServer ? "Ocultar servidores" : "Mostrar servidores"} size={40} className={`text-3xl animate-pulse hover:scale-110 ${showServer ? " -rotate-90 text-amber-600" : "rotate-90"}`} />
        </span>}
      </div>
      {empresa?.ftp_server && empresa?.ftp_server.length > 0 && (
        <div className="">
          {showServer && (
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ duration: 0.8 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-zinc-800 z-0 rounded-2xl border border-gray-400/50 -mt-14"
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

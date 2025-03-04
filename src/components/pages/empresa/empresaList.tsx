"use client";

import { FtpEmpresaAllType } from "@/app/types/FtpEmpresaType";
import { useQuery } from "@tanstack/react-query";
import React from "react";

import EmpresaItem from "./empresaItem";

export default function EmpresaList() {
  //   const queryClient = useQueryClient();
  const getAllEmpresas = async (): Promise<FtpEmpresaAllType[]> => {
    const response = await fetch("/api/ftp_empresa");
    return response.json();
  };
  const { data: empresas } = useQuery({
    queryKey: ["ftpEmpresa"],
    queryFn: getAllEmpresas,
  });

  return (
    <div className="mt-8 bg-zinc-800 p-4 rounded-lg h-full">

      <div className="flex flex-wrap gap-4 justify-around">
        {empresas?.map((empresa, index) => (
          <EmpresaItem empresa={empresa} key={index} />
        ))}
      </div>
    </div>
  );
}

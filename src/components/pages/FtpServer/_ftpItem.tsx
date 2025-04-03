import { FtpServerType } from "@/app/types/FtpServersTypes";
import React, { useState } from "react";

export default function ServerFtpItem({
  id,
  host,
  port,
  username,
  password,
  createdAt,
  name,
}: FtpServerType) {
  const [hidePassword, setHidePassword] = useState<boolean>(false);
  return (
    <div className="rounded-lg p-4 pt-16 z-0 -mt-8">
      <h3 className="mt-6 mb-2 text-3xl text-blue-500">Servidor: {name}</h3>
      <hr />
      <p className="mt-4">ID: {id}</p>
      <p>Host: {host}</p>
      <p>Porta: {port}</p>
      <p>Usuário: {username}</p>
      <p
        onClick={() => setHidePassword(!hidePassword)}
        title={`${hidePassword ? "Esconder Senha" : "Mostar senha"}`}
        className="cursor-pointer"
      >
        Senha: {!hidePassword ? "*******" : password}
      </p>
      <p>Criado em: {new Date(createdAt).toLocaleString()}</p>
    </div>
  );
}

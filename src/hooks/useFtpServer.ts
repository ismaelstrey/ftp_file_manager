import { useEffect, useState } from "react";
import axios from "axios";
import { FtpServerType } from "@/app/types/FtpServersTypes";

const useFtpServer = () => {
  const [ftpServers, setFtpServers] = useState<FtpServerType[]>([]);

  const getAllFtpServer = async (): Promise<void> => {
    const response = await axios.get("/api/ftp_server");
    setFtpServers(response.data);
  };

  useEffect(() => {
    getAllFtpServer();
  }, []);

  const togleOlt = async (id: number, active: boolean): Promise<void> => {
    await axios.patch("/api/ftp_server", { id, active });
    getAllFtpServer();
  };

  return { getAllFtpServer, ftpServers, togleOlt };
};

export default useFtpServer;

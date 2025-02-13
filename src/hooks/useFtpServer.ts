import { useEffect, useState } from "react";
import axios from "axios";
import { FtpServerType } from "@/app/types/FtpServersTypes";
import useFetch from "./useFetch";

const useFtpServer = () => {
  const [ftpServers, setFtpServers] = useState<FtpServerType[]>([]);

  const getAllFtpServer = async (): Promise<void> => {
    const response = await axios.get("/api/ftp_server");
    setFtpServers(response.data);
  };

  useEffect(() => {
    getAllFtpServer();
  }, []);

  const handleTogleOlt = async (id: number, active: boolean): Promise<void> => {
    await axios.patch("/api/ftp_server", { id, active });

  };

  return { getAllFtpServer, ftpServers, handleTogleOlt };
};

export default useFtpServer;

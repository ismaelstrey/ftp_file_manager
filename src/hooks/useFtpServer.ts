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

  return { getAllFtpServer, ftpServers };
};

export default useFtpServer;

export interface FtpServer {
    id: number;
    name: string; // Adicione os campos reais que o modelo FtpServer possui
};

export interface Connection {
    id: number;
    status: boolean;
    server: FtpServer;
    ftpServerId: number;
    createdAt: Date;
};
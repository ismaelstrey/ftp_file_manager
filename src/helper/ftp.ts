import moment from 'moment';
import { PrismaClient } from "@prisma/client";
import FTPClient from "ftp";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';


const MAX_CONNECTIONS = 4;
let activeConnections = 0;
const connectionQueue: (() => void)[] = [];
const activeClients: FTPClient[] = [];

const waitForConnection = (): Promise<void> => {
    return new Promise((resolve) => {
        if (activeConnections < MAX_CONNECTIONS) {
            activeConnections++;
            resolve();
        } else {
            connectionQueue.push(resolve);
        }
    });
};

const releaseConnection = (client: FTPClient) => {
    activeConnections--;
    const index = activeClients.indexOf(client);
    if (index > -1) {
        activeClients.splice(index, 1);
    }

    if (connectionQueue.length > 0) {
        const next = connectionQueue.shift();
        if (next) {
            activeConnections++;
            next();
        }
    }
};

const prisma = new PrismaClient();

const ftpConfig = {
    host: process.env.FTP_HOST,
    user: process.env.FTP_USER,
    port: Number(process.env.FTP_PORT) || 21,
    password: process.env.FTP_PASSWORD,
};

// Primeiro, definimos a interface para os arquivos FTP
interface FTPFile {
    name: string;
    type: string;
    size: number;
    date: Date | string;
}

const connectFTP = async (): Promise<FTPClient> => {
    await waitForConnection();

    return new Promise((resolve, reject) => {
        const client = new FTPClient();

        client.on("ready", () => {
            activeClients.push(client);
            resolve(client);
        });

        client.on("error", (err) => {
            releaseConnection(client);
            reject(err);
        });

        client.on("end", () => {
            releaseConnection(client);
            console.log("Disconnected from FTP server");
        });

        client.connect(ftpConfig);
    });
};

const listDirectory = (client: FTPClient, directory: string): Promise<FTPFile[]> => {
    return new Promise((resolve, reject) => {
        client.list(directory, (err: Error | null, list: FTPFile[]) => {
            if (err) return reject(err);
            resolve(list);
        });
    });
};

// Adicionar novo diretório para monitoramento
const addDirectory = async (path: string) => {
    try {
        const directory = await prisma.monitoredDirectory.create({
            data: { path },
        });
        return directory;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
            throw new Error('Este diretório já está sendo monitorado');
        }
        throw error;
    }
};

// Remover diretório do monitoramento
const removeDirectory = async (id: number) => {
    return await prisma.monitoredDirectory.delete({
        where: {
            id,
        },
    });
};

// Listar todos os diretórios monitorados
const getMonitoredDirectories = async () => {
    return await prisma.monitoredDirectory.findMany();
};

// Modificar a função checkDirectories para usar os diretórios do banco
const checkDirectories = async () => {
    const client = await connectFTP();
    const result = [];

    try {
        const directories = await getMonitoredDirectories();

        for (const dir of directories) {
            const files = await listDirectory(client, dir.path);
            const newFiles = files.filter((file) => {
                const fileDate = moment(file.date);
                return fileDate.isSame(moment().subtract(1, "day"), "day");
            });

            result.push({
                directory: dir.path,
                newFiles: newFiles.map((file) => (
                    {
                        name: file.name,
                        date: file.date,
                        size: file.size,
                        type: file.type
                    })),
            });
        }
    } finally {
        client.end();
    }

    return result;
};

function getFileExtension(filename: string) {
    const regex = /\.([a-zA-Z0-9]+)$/; // Regex para capturar a extensão após o último ponto
    const match = filename.match(regex);
    return match ? match[1] : null; // Retorna a extensão ou null se não encontrar
}

// Listar arquivos de um diretório específico
const getDirectoryFiles = async (path: string) => {
    const regex = /\d{4}-\d{2}-\d{2}/;
    const client = await connectFTP();
    try {
        const files = await listDirectory(client, path);
        return files.map(file => ({
            name: file.name,
            date: file.name.match(regex)?.[0] || file.date,
            size: file.size,
            type: getFileExtension(file.name) || file.type
        }));
    } finally {
        client.end();
    }
};

// Listar arquivos de todos os diretórios monitorados
const getAllDirectoriesFiles = async () => {
    const client = await connectFTP();
    const result = [];

    try {
        const directories = await getMonitoredDirectories();

        for (const dir of directories) {
            const files = await listDirectory(client, dir.path);
            result.push({
                directory: dir.path,
                files: files
                    .filter(file => file.name !== '.' && file.name !== '..') // Remove . e ..
                    .map(file => ({
                        name: file.name,
                        date: moment(file.date).format('YYYY-MM-DD HH:mm:ss'),
                        size: file.size,
                        type: file.type
                    }))
            });
        }
    } finally {
        client.end();
    }

    return result;
};

export {
    checkDirectories,
    addDirectory,
    removeDirectory,
    getMonitoredDirectories,
    getDirectoryFiles,
    getAllDirectoriesFiles
};

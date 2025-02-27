import { FtpServerType } from "./FtpServersTypes";

export interface FtpEmpresaType {
    id: number;
    name: string;
    active: boolean;
    createdAt: string;
    ftpServerId: number;
}
export interface FtpEmpresaAllType extends FtpEmpresaType {
    server: FtpServerType
}
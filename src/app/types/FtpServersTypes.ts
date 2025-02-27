import { FtpEmpresaType } from "./FtpEmpresaType";

export interface FtpConnectionConfig {
  name?: string;
  host: string;
  username: string;
  password: string;
  active?: boolean;
  port?: number;
};
export interface FtpServerType extends FtpConnectionConfig {
  active: boolean;
  ftp_empresaId?: number;
  createdAt: Date;
  id?: number;
}
export interface FtpServerAllType extends FtpServerType {
  ftp_empresa: FtpEmpresaType[];
}





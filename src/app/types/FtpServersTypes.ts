export interface FtpServerType {
  active: boolean;
  name?: string;
  createdAt: Date;
  host: string;
  id?: number;
  password: string;
  port: number;
  username: string;
}

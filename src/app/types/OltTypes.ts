export interface Olts {
    id: number;
    path: string;
    name: string;
    lastBackup?: string;
}
export interface Backup {
    name: string;
    date: string;
    size: number;
    type: string;
}
export interface BackupListAll {
    olt: string;
    totalData: number;
    totalConfig: number;
    data: Backup[];
}
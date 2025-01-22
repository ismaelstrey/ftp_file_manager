export interface Olt {
    name: string;
    date: string;
    size: number;
    type: string;
}

export interface Backup {
    olt: string;
    date: string;
    size: number;
    type: string;
}
export interface BackupListAll {
    olt: string;
    totalData: number;
    totalConfig: number;
    data: Olt[];
    config: Olt[];
}


export function bytesToMB(bytes: number) {
    const MB = bytes / (1024 * 1024); // Converte bytes para MB
    return MB.toFixed(2); // Retorna o valor com 2 casas decimais
}

export const sumSizes = (files: { size: number; date: string | Date }[]): number => {
    return files.map(file => ({
        ...file,
        date: typeof file.date === 'string' ? file.date : file.date.toISOString()
    })).reduce((acc, file) => acc + file.size, 0);
};
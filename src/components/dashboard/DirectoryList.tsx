import { motion } from 'framer-motion';
import { FolderIcon, TrashIcon } from '@heroicons/react/24/outline';

interface Directory {
    id: number;
    path: string;
    lastBackup?: string;
}

interface DirectoryListProps {
    directories: Directory[];
    onDelete: (id: number) => void;
}

export default function DirectoryList({ directories, onDelete }: DirectoryListProps) {
    return (
        <div className="bg-white rounded-xl shadow-xs p-6">
            <h2 className="text-xl font-semibold mb-4">Diretórios Monitorados</h2>
            <div className="space-y-3">
                {directories.map((dir) => (
                    <motion.div
                        key={dir.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                        <div className="flex items-center gap-3">
                            <FolderIcon className="h-5 w-5 text-blue-500" />
                            <div>
                                <p className="font-medium">{dir.path}</p>
                                {dir.lastBackup && (
                                    <p className="text-sm text-gray-500">
                                        Último backup: {dir.lastBackup}
                                    </p>
                                )}
                            </div>
                        </div>
                        <button
                            onClick={() => onDelete(dir.id)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                            <TrashIcon className="h-5 w-5" />
                        </button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
} 
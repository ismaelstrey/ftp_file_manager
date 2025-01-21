import { useState } from 'react';
import { motion } from 'framer-motion';

interface AddDirectoryFormProps {
    onAdd: (path: string) => Promise<void>;
}

export default function AddDirectoryForm({ onAdd }: AddDirectoryFormProps) {
    const [path, setPath] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onAdd(path);
            setPath('');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Adicionar Diretório</h2>
            <div className="flex gap-3">
                <input
                    type="text"
                    value={path}
                    onChange={(e) => setPath(e.target.value)}
                    placeholder="Caminho do diretório"
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loading}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                >
                    {loading ? 'Adicionando...' : 'Adicionar'}
                </motion.button>
            </div>
        </form>
    );
} 
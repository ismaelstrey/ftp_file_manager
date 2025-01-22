'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface AddTaskFormProps {
    onClose: () => void;
}

export default function AddTaskForm({ onClose }: AddTaskFormProps) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        isContinuous: false,
        dueDate: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Implementar lógica de criação de tarefa
        onClose();
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Nova Tarefa</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Título
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-3 py-2 border rounded-lg"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Descrição
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full px-3 py-2 border rounded-lg"
                            rows={3}
                        />
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="isContinuous"
                            checked={formData.isContinuous}
                            onChange={(e) => setFormData({ ...formData, isContinuous: e.target.checked })}
                            className="mr-2"
                        />
                        <label htmlFor="isContinuous" className="text-sm">
                            Tarefa Contínua (diária)
                        </label>
                    </div>
                    {!formData.isContinuous && (
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Data de Vencimento
                            </label>
                            <input
                                type="date"
                                value={formData.dueDate}
                                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </div>
                    )}
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                            Criar Tarefa
                        </button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
} 
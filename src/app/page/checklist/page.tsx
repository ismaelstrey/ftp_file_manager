'use client';
import { useState } from 'react';
import TaskList from '@/components/checklist/TaskList';
import AddTaskForm from '@/components/checklist/AddTaskForm';

export default function ChecklistPage() {
    const [showAddForm, setShowAddForm] = useState(false);

    return (
        <main className="ml-64 p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">Checklist de Tarefas</h1>
                <button
                    onClick={() => setShowAddForm(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Nova Tarefa
                </button>
            </div>

            <TaskList />

            {showAddForm && (
                <AddTaskForm onClose={() => setShowAddForm(false)} />
            )}
        </main>
    );
}

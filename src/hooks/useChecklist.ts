'use client';
import { useState, useEffect, useCallback } from 'react';
import { Task } from '@/app/types/ChecklistTypes';

interface UseChecklistReturn {
    tasks: Task[];
    loading: boolean;
    error: Error | null;
    createTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'completedAt'>) => Promise<void>;
    updateTask: (id: number, task: Partial<Task>) => Promise<void>;
    deleteTask: (id: number) => Promise<void>;
    completeTask: (id: number) => Promise<void>;
    resetTask: (id: number) => Promise<void>;
    refreshTasks: () => Promise<void>;
}

export function useChecklist(): UseChecklistReturn {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const refreshTasks = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/checklist');
            if (!response.ok) throw new Error('Falha ao carregar tarefas');
            const data = await response.json();
            setTasks(data);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Erro desconhecido'));
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        refreshTasks();
    }, [refreshTasks]);

    const createTask = async (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'completedAt'>) => {
        try {
            setLoading(true);
            const response = await fetch('/api/checklist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(task),
            });

            if (!response.ok) throw new Error('Falha ao criar tarefa');
            await refreshTasks();
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Erro ao criar tarefa'));
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateTask = async (id: number, task: Partial<Task>) => {
        try {
            setLoading(true);
            const response = await fetch(`/api/checklist/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(task),
            });

            if (!response.ok) throw new Error('Falha ao atualizar tarefa');
            await refreshTasks();
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Erro ao atualizar tarefa'));
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deleteTask = async (id: number) => {
        try {
            setLoading(true);
            const response = await fetch(`/api/checklist/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Falha ao deletar tarefa');
            await refreshTasks();
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Erro ao deletar tarefa'));
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const completeTask = async (id: number) => {
        try {
            setLoading(true);
            const response = await fetch(`/api/checklist/${id}/complete`, {
                method: 'POST',
            });

            if (!response.ok) throw new Error('Falha ao completar tarefa');
            await refreshTasks();
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Erro ao completar tarefa'));
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const resetTask = async (id: number) => {
        try {
            setLoading(true);
            const response = await fetch(`/api/checklist/${id}/reset`, {
                method: 'POST',
            });

            if (!response.ok) throw new Error('Falha ao resetar tarefa');
            await refreshTasks();
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Erro ao resetar tarefa'));
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        tasks,
        loading,
        error,
        createTask,
        updateTask,
        deleteTask,
        completeTask,
        resetTask,
        refreshTasks
    };
} 
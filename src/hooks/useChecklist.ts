'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Task } from '@/app/types/ChecklistTypes';

interface UseChecklistReturn {
    tasks: Task[];
    isLoading: boolean;
    error: Error | null;
    createTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'completedAt'>) => Promise<void>;
    updateTask: (id: number, task: Partial<Task>) => Promise<void>;
    deleteTask: (id: number) => Promise<void>;
    completeTask: (id: number) => Promise<void>;
    resetTask: (id: number) => Promise<void>;
}

const fetchTasks = async (): Promise<Task[]> => {
    const response = await fetch('/api/checklist');
    if (!response.ok) throw new Error('Falha ao carregar tarefas');
    return response.json();
};

export function useChecklist(): UseChecklistReturn {
    const queryClient = useQueryClient();

    const { data: tasks = [], isLoading, error } = useQuery<Task[], Error>({
        queryKey: ['tasks'],
        queryFn: fetchTasks,
    });

    const createTaskMutation = useMutation({
        mutationFn: async (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'completedAt'>) => {
            const response = await fetch('/api/checklist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(task),
            });
            if (!response.ok) throw new Error('Falha ao criar tarefa');
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });

    const updateTaskMutation = useMutation({
        mutationFn: async ({ id, task }: { id: number; task: Partial<Task> }) => {
            const response = await fetch(`/api/checklist/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(task),
            });
            if (!response.ok) throw new Error('Falha ao atualizar tarefa');
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });

    const deleteTaskMutation = useMutation({
        mutationFn: async (id: number) => {
            const response = await fetch(`/api/checklist/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Falha ao deletar tarefa');
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });

    const completeTaskMutation = useMutation({
        mutationFn: async (id: number) => {
            const response = await fetch(`/api/checklist/${id}/complete`, {
                method: 'POST',
            });
            if (!response.ok) throw new Error('Falha ao completar tarefa');
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });

    const resetTaskMutation = useMutation({
        mutationFn: async (id: number) => {
            const response = await fetch(`/api/checklist/${id}/reset`, {
                method: 'POST',
            });
            if (!response.ok) throw new Error('Falha ao resetar tarefa');
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });

    return {
        tasks,
        isLoading,
        error,
        createTask: createTaskMutation.mutateAsync,
        updateTask: (id: number, task: Partial<Task>) => updateTaskMutation.mutateAsync({ id, task }),
        deleteTask: deleteTaskMutation.mutateAsync,
        completeTask: completeTaskMutation.mutateAsync,
        resetTask: resetTaskMutation.mutateAsync,
    };
}

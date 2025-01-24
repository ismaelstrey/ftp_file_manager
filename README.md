This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.











Vou criar um hook personalizado para gerenciar as tarefas do checklist:

```typescript:src/hooks/useChecklist.ts
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
```

Agora você pode usar o hook nos seus componentes assim:

```typescript:src/components/checklist/TaskList.tsx
'use client';
import { motion } from 'framer-motion';
import { useChecklist } from '@/hooks/useChecklist';
import { CheckCircleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

export default function TaskList() {
    const { tasks, loading, completeTask, resetTask } = useChecklist();

    if (loading) return <div>Carregando...</div>;

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tasks.map((task) => (
                    <motion.div
                        key={task.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 rounded-lg border ${task.status === 'completed' ? 'bg-green-50' : 'bg-white'}`}
                    >
                        {/* ... resto do código ... */}
                        <div className="flex gap-2">
                            {task.status === 'pending' ? (
                                <button
                                    onClick={() => completeTask(task.id)}
                                    className="text-green-500 hover:text-green-600"
                                >
                                    <CheckCircleIcon className="h-6 w-6" />
                                </button>
                            ) : task.isContinuous ? (
                                <button
                                    onClick={() => resetTask(task.id)}
                                    className="text-blue-500 hover:text-blue-600"
                                >
                                    <ArrowPathIcon className="h-6 w-6" />
                                </button>
                            ) : null}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
```

Principais características do hook:
1. Gerenciamento de estado com useState
2. Carregamento automático inicial com useEffect
3. Tratamento de erros
4. Funções para todas as operações CRUD
5. Atualização automática após operações
6. Tipagem forte com TypeScript
7. Loading state para feedback visual
8. Métodos específicos para tarefas contínuas


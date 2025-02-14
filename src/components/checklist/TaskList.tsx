'use client';
import { motion } from 'framer-motion';
import { useChecklist } from '@/hooks/useChecklist';
import { CheckCircleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

export default function TaskList() {
    const { tasks, loading, completeTask, resetTask } = useChecklist();

    console.log(tasks);

    const sortedTasks = tasks.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    if (loading) return <div>Carregando...</div>;

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sortedTasks.map((task) => (
                    <motion.div
                        key={task.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 rounded-lg border ${task.status === 'completed' ? 'bg-green-50' : 'bg-white'
                            }`}
                    >
                        <div className="flex justify-between items-start">
                            <div className='flex w-full flex-col gap-2'>
                                <h3 className="font-semibold">{task.title}</h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    {task.description}
                                </p>
                                <div className='flex w-full gap-8 justify-between'>
                                    {task.isContinuous && (
                                        <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded mt-2">
                                            Tarefa Contínua
                                        </span>
                                    )}
                                    {task.status === 'completed' && (
                                        <div className=' w-full justify-between'>
                                            <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-green-800 rounded mt-2">
                                                Tarefa completa <CheckCircleIcon className="h-4 w-4 inline-block" />
                                            </span>
                                            <span>
                                                {task.completedAt && (
                                                    <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-green-800 rounded mt-2">
                                                        Realizada em: {new Date(task.completedAt).toLocaleString()}
                                                    </span>
                                                )}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
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
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
} 
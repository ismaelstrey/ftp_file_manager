export interface Task {
    id: number;
    title: string;
    description: string;
    isContinuous: boolean;
    status: 'pending' | 'completed';
    dueDate?: Date;
    completedAt?: Date;
    createdAt: Date;
} 
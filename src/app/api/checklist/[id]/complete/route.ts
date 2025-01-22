import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// POST - Marcar tarefa como completa
export async function POST(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const task = await prisma.task.update({
            where: { id: parseInt(params.id) },
            data: {
                status: 'completed',
                completedAt: new Date()
            }
        });
        return new Response(JSON.stringify(task), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Erro ao completar tarefa' }), { status: 500 });
    }
} 
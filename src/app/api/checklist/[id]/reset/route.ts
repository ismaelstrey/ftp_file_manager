import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// POST - Resetar tarefa contínua
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const task = await prisma.task.update({
            where: { id: parseInt(id) },
            data: {
                status: 'pending',
                completedAt: null
            }
        });
        return new Response(JSON.stringify(task), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: 'Erro ao resetar tarefa' }), { status: 500 });
    }
} 
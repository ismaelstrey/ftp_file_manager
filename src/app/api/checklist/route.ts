import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET - Listar todas as tarefas
export async function GET() {
    try {
        const tasks = await prisma.task.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
        return new Response(JSON.stringify(tasks), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Erro ao buscar tarefas' }), { status: 500 });
    }
}

// POST - Criar nova tarefa
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const task = await prisma.task.create({
            data: {
                title: body.title,
                description: body.description,
                isContinuous: body.isContinuous,
                dueDate: body.dueDate ? new Date(body.dueDate) : null,
            }
        });
        return new Response(JSON.stringify(task), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Erro ao criar tarefa' }), { status: 500 });
    }
} 
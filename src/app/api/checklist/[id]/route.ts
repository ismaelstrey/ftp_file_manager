import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET - Buscar tarefa específica
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const task = await prisma.task.findUnique({
            where: { id: parseInt(params.id) }
        });

        if (!task) {
            return new Response(JSON.stringify({ error: 'Tarefa não encontrada' }), { status: 404 });
        }

        return new Response(JSON.stringify(task), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Erro ao buscar tarefa' }), { status: 500 });
    }
}

// PUT - Atualizar tarefa
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();
        const task = await prisma.task.update({
            where: { id: parseInt(params.id) },
            data: {
                title: body.title,
                description: body.description,
                isContinuous: body.isContinuous,
                status: body.status,
                dueDate: body.dueDate ? new Date(body.dueDate) : null,
                completedAt: body.status === 'completed' ? new Date() : null
            }
        });
        return new Response(JSON.stringify(task), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Erro ao atualizar tarefa' }), { status: 500 });
    }
}

// DELETE - Remover tarefa
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.task.delete({
            where: { id: parseInt(params.id) }
        });
        return new Response(null, { status: 204 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Erro ao deletar tarefa' }), { status: 500 });
    }
} 
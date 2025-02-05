import { prisma } from "@/lib/prisma";
import { FtpEmpresal } from "@prisma/client";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        const directories = await prisma.ftpEmpresal.findMany({});
        return NextResponse.json(directories);
    } catch (error) {
        console.log(error);
        return new Response('Failed to fetch directories', { status: 500 });
    }
}

export async function POST(request: Request) {
    const data: FtpEmpresal = await request.json();
    try {
        const directory = await prisma.ftpEmpresal.create({
            data
        });
        return NextResponse.json(directory);
    } catch (error) {
        console.log(error);
        return new Response('Failed to add directory', { status: 500 });
    }
}
export async function DELETE(request: Request) {
    const { id } = await request.json();
    try {
        const directory = await prisma.ftpEmpresal.delete({
            where: {
                id
            }
        });
        return NextResponse.json(directory);
    } catch (error) {
        console.log(error);
        return new Response('Failed to remove directory', { status: 500 });
    }
}

export async function PUT(request: Request) {
    const data: FtpEmpresal = await request.json();
    try {
        const directory = await prisma.ftpEmpresal.update({
            where: {
                id: data.id
            },
            data
        });
        return NextResponse.json(directory);
    } catch (error) {
        console.log(error);
        return new Response('Failed to update directory', { status: 500 });
    }
}

export async function PATCH(request: Request) {
    const data: FtpEmpresal = await request.json();
    try {
        const directory = await prisma.ftpEmpresal.update({
            where: {
                id: data.id
            },
            data
        });
        return NextResponse.json(directory);
    } catch (error) {
        console.log(error);
        return new Response('Failed to update directory', { status: 500 });
    }
}
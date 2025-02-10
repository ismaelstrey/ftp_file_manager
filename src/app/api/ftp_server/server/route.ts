import { sumSizes } from "@/helper/conversor";
import { addDirectory, removeDirectory, getDirectoryFiles } from "@/helper/ftp";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ olt: string }> }
) {
    const { olt } = await params;
    const dir = process.env.DIERETORIO_FTP || 'BKP_OLT/';

    try {
        const data = await getDirectoryFiles(dir + olt + '/DATA');
        const config = await getDirectoryFiles(dir + olt + '/CONFIG');
        const sizeConfig = config ? sumSizes(config) : 0;
        const sizeData = data ? sumSizes(data) : 0;

        return new Response(JSON.stringify({
            olt,
            totalData: data.length,
            totalConfig: config.length,
            sizeConfig,
            sizeData,
            data,
            config
        }), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response('Failed to fetch directories', { status: 500 });
    }
}

export async function POST(request: Request) {
    const { id, active } = await request.json();
    try {
        const ftpServerById = await prisma.ftpServer.findFirst({
            where: {
                id
            }
        })

        if (!ftpServerById) {
            return new Response(JSON.stringify({ error: 'FTP Server not found' }), { status: 404 });
        }
        const ftpActiveServer = await prisma.ftpServer.update({
            where: {
                id
            },
            data: {
                active
            }
        })

        return NextResponse.json(ftpActiveServer);
    } catch (error) {
        console.log(error);
        return new Response('Failed to add directory', { status: 500 });
    }
}
export async function PATCH(request: Request) {
    const { id, active } = await request.json();
    try {
        const ftpServerById = await prisma.ftpServer.findFirst({
            where: {
                id
            }
        })

        if (!ftpServerById) {
            return new Response(JSON.stringify({ error: 'FTP Server not found' }), { status: 404 });
        }
        const ftpActiveServer = await prisma.ftpServer.update({
            where: {
                id
            },
            data: {
                active
            }
        })

        return NextResponse.json(ftpActiveServer);
    } catch (error) {
        console.log(error);
        return new Response('Failed to add directory', { status: 500 });
    }
}

export async function DELETE(request: Request) {
    const { path } = await request.json();

    console.log(path);
    try {
        const directory = await removeDirectory(path);
        return new Response(JSON.stringify(directory), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response('Failed to remove directory', { status: 500 });
    }
}
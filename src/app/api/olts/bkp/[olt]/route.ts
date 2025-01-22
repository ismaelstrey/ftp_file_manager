import { sumSizes } from "@/helper/conversor";
import { addDirectory, removeDirectory, getDirectoryFiles } from "@/helper/ftp";
import { NextRequest } from "next/server";

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
    const { path } = await request.json();
    try {
        const directory = await addDirectory(path);
        return new Response(JSON.stringify(directory), { status: 200 });
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
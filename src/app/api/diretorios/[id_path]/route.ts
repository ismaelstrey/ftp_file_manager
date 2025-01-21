import { addDirectory, getMonitoredDirectories, removeDirectory } from "@/helper/ftp";


export async function GET() {
    const directories = await getMonitoredDirectories();
    try {
        return new Response(JSON.stringify(directories), { status: 200 });
    } catch (error) {
        return new Response('Failed to fetch directories', { status: 500 });
    }

}

export async function POST(request: Request) {
    const { path } = await request.json();
    try {
        const directory = await addDirectory(path);
        return new Response(JSON.stringify(directory), { status: 200 });
    } catch (error) {
        return new Response('Failed to add directory', { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id_path: string } }) {
    const { id_path } = await params;

    console.log(id_path);
    try {
        const directory = await removeDirectory(Number(id_path));
        return new Response(JSON.stringify({ message: 'Directory removed', ...directory }), { status: 200 });
    } catch (error) {
        return new Response('Failed to remove directory', { status: 500 });
    }
}
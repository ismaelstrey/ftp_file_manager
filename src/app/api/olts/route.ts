import { addDirectory, removeDirectory, getDirectoryFiles } from "@/helper/ftp";


export async function GET() {

    const directories = await getDirectoryFiles('BKP_OLT');
    try {
        return new Response(JSON.stringify(directories), { status: 200 });
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


    try {
        const directory = await removeDirectory(path);
        return new Response(JSON.stringify(directory), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response('Failed to remove directory', { status: 500 });
    }
}
import { prisma } from "@/lib/prisma";
import { FtpEmpresa } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const directories = await prisma.ftpEmpresa.findMany({

      select: {
        ftp_server: true
      }
    });
    return NextResponse.json(directories);
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch directories", { status: 500 });
  }
}

export async function POST(request: Request) {
  const data: FtpEmpresa = await request.json();
  console.log(data);

  try {
    const directory = await prisma.ftpEmpresa.create({ data });
    return NextResponse.json(directory);
  } catch (error) {
    console.error(error);
    return new Response("Failed to add empresa", {
      status: 500,
    });
  }
}
export async function DELETE(request: Request) {
  const { id } = await request.json();
  try {
    const directory = await prisma.ftpEmpresa.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(directory);
  } catch (error) {
    console.log(error);
    return new Response("Failed to remove directory", { status: 500 });
  }
}

export async function PUT(request: Request) {
  const data: FtpEmpresa = await request.json();
  try {
    const directory = await prisma.ftpEmpresa.update({
      where: {
        id: data.id,
      },
      data,
    });
    return NextResponse.json(directory);
  } catch (error) {
    console.log(error);
    return new Response("Failed to update directory", { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const data: FtpEmpresa = await request.json();
  try {
    const directory = await prisma.ftpEmpresa.update({
      where: {
        id: data.id,
      },
      data,
    });
    return NextResponse.json(directory);
  } catch (error) {
    console.log(error);
    return new Response("Failed to update directory", { status: 500 });
  }
}

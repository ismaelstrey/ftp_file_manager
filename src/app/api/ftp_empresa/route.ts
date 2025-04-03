import { prisma } from "@/lib/prisma";
import { FtpEmpresa } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const directories = await prisma.ftpEmpresa.findMany({

      select: {
        id: true,
        name: true,
        active: true,
        createdAt: true,
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

  if (data.id) {
    const existFtpServer = await prisma.ftpServer.findFirst({
      where: {
        id: data.id,
      },
    });
    if (!existFtpServer) {
      return new Response("Failed servidor selecionado não existe", {
        status: 500,
      });
    }
    console.log(existFtpServer);
  }

  try {
    const directory = await prisma.ftpEmpresa.create({
      data,
    });
    return NextResponse.json(directory);
  } catch (error) {
    console.error(error);
    return new Response("Failed to add directory", {
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
  const { id, ...data }: FtpEmpresa = await request.json();
  try {
    const directory = await prisma.ftpEmpresa.update({
      where: {
        id: id,
      },
      data,
    });

    console.log(directory);
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

import { prisma } from "@/lib/prisma";
import { FtpServer } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const directories = await prisma.ftpServer.findMany({});
    return NextResponse.json(directories);
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch directories", { status: 500 });
  }
}

export async function POST(request: Request) {
  const data: FtpServer = await request.json();
  console.log(data);
  try {
    const directory = await prisma.ftpServer.create({
      data,
    });
    return NextResponse.json(directory);
  } catch (error) {
    console.log(error);
    return new Response("Failed to add directory", { status: 500 });
  }
}
export async function DELETE(request: Request) {
  const { id } = await request.json();
  try {
    const directory = await prisma.ftpServer.delete({
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
  const data: FtpServer = await request.json();
  try {
    const directory = await prisma.ftpServer.update({
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
  const data: FtpServer = await request.json();
  const oltBusca = await prisma.ftpServer.findMany({
    where: {
      active: true,
    },
  })

  if (oltBusca) {
    oltBusca.map(async (olt) => {
      await prisma.ftpServer.update({
        where: {
          id: olt.id,
        },
        data: {
          active: false,
        },
      });
    })

  }

  try {
    const directory = await prisma.ftpServer.update({
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

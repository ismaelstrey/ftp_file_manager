import { prisma } from "@/lib/prisma";
import { Comando } from "@prisma/client";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    const data = await prisma.comando.findMany()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const { command, name,type,olt,horario }:Comando = await request.json()
  if (!command || !name || !type || !olt) {
    return NextResponse.json({ message: "Os campos não podem estar vazios" }, { status: 400 })
  }
  try {
    const newComando = await prisma.comando.create({
      data: {
       command,
       name,
       olt,
       type,
       horario
      }
    })  
    return NextResponse.json(newComando) 
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 })
  }
}
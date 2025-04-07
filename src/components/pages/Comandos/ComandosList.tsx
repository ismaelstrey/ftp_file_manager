'use client'
import { Comando } from "@prisma/client"
import axios from "axios"
import { useEffect, useState } from "react"

export default function ComandosList() {
    const [comandos, setComandos] = useState<Comando[] | []>([])
const getComandos = async ():Promise<Comando[] |[]> => {
    const {data} =await axios.get('/api/comandos')
    return data
}
useEffect(()=>{
    getComandos().then((data)=>{
        setComandos(data)
    })
},[])
    return (
        <main className="flex  flex-col p-2 bg-black gap-2">
      
{comandos.map((list,key) => 
    <div key={key} className="bg-zinc-900 p-2 flex flex-col border-amber-500 border">
        <div className="flex justify-between bg-amber-950">  
            <span className="border p-2 rounded-4xl bg-amber-500 text-black text-sm">{list.name}</span>        
            <span className="border p-2 rounded-4xl bg-amber-500 text-black text-sm">{list.olt}</span>
            <span className="border p-2 rounded-4xl bg-amber-500 text-black text-sm">{list.horario}</span>
        </div>
        <span className="Flex mt-4">{list.command}</span>
    </div>      
)}
        </main>
    )
}
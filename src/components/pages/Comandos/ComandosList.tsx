'use client'
import { Comando } from "@prisma/client"
import axios from "axios"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function ComandosList() {
    const [comandos, setComandos] = useState<Comando[] | []>([])
    const [isLoading, setIsLoading] = useState(true)

    const getComandos = async (): Promise<Comando[] | []> => {
        try {
            const { data } = await axios.get('/api/comandos')
            return data
        } catch (error) {
            console.error('Error fetching comandos:', error)
            return []
        }
    }

    useEffect(() => {
        getComandos().then((data) => {
            setComandos(data)
            setIsLoading(false)
        })
    }, [])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 1 },
        visible: {
            y: 5,
            opacity: 0.5,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    }

    if (isLoading) {
        return (
            <section className="min-h-screen flex items-center justify-center bg-black">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full"
                />
            </section>
        )
    }

    return (
        <section className="min-h-screen p-4 text">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid gap-4 max-w-4xl mx-auto"
            >
                {comandos.map((item, index) => (
                    <motion.article
                        key={index}
                        variants={itemVariants}
                        className="bg-zinc-900 p-4 rounded-lg border-amber-500 border hover:shadow-lg hover:shadow-amber-500/20 transition-shadow"
                    >
                        <header className="flex justify-between items-center bg-amber-950/50 p-3 rounded-lg">
                            <motion.span
                                whileHover={{ scale: 1.05 }}
                                className="px-4 py-2 rounded-full bg-amber-500 text-black font-medium"
                            >
                                {item.name}
                            </motion.span>
                            <motion.span
                                whileHover={{ scale: 1.05 }}
                                className="px-4 py-2 rounded-full bg-amber-500 text-black font-medium"
                            >
                                {item.olt}
                            </motion.span>
                            <motion.span
                                whileHover={{ scale: 1.05 }}
                                className="px-4 py-2 rounded-full bg-amber-500 text-black font-medium"
                            >
                                {item.horario}
                            </motion.span>
                        </header>
                        <div className="mt-4 p-3 bg-zinc-800/50 rounded-lg">
                            <code className="font-mono text-amber-100">
                                {item.command}
                            </code>
                        </div>
                    </motion.article>
                ))}
            </motion.div>
        </section>
    )
}
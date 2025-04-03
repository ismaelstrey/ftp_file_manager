'use client';
import { HomeIcon, FolderIcon, ClockIcon, CogIcon, TableCellsIcon, CheckIcon, BuildingStorefrontIcon, ServerIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { SlArrowRight } from 'react-icons/sl';

const menuItems = [
    { name: 'Dashboard', icon: HomeIcon, href: '/' },
    { name: 'OLTs', icon: TableCellsIcon, href: '/page/olts' },
    { name: 'Diretórios', icon: FolderIcon, href: '/page/diretorios' },
    { name: 'Histórico', icon: ClockIcon, href: '/page/historico' },
    { name: 'Checklist', icon: CheckIcon, href: '/page/checklist' },
    { name: 'Empresas', icon: BuildingStorefrontIcon, href: '/page/empresas' },
    { name: 'FTPs Server', icon: ServerIcon, href: '/page/ftpServer' },
    { name: 'Configurações', icon: CogIcon, href: '/page/configuracoes' },
];

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(true); // Set default to true for consistent initial state
    return (
        <div>

            {
                isOpen ? (
                    <>
                        <div className='w-64'></div>

                        <motion.div
                            initial={{ x: -100, opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            exit={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="min-h-screen border-r-2 border-white/50 h-full w-64 bg-gray-900 text-white p-4 fixed left-0 top-0 rounded-r-4xl"

                        >
                            <div className="mb-8 text-amber-600">
                                <h1 className="text-xl font-bold">FTP Backup Manager</h1>
                            </div>
                            <div className='fixed top-0 left-0 w-8 h-screen rotate-180 flex items-center gap-4 cursor-pointer'>
                                <SlArrowRight title='fechar menu' size={30} onClick={() => setIsOpen(!isOpen)} className='hover:scale-125 transition-all' />
                            </div>
                            <nav>
                                {menuItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 hover:text-amber-600 transition-colors"
                                    >
                                        <item.icon className="h-5 w-5" />
                                        <span>{item.name}</span>
                                    </Link>
                                ))}
                            </nav>
                        </motion.div>
                    </>) : (
                    <div className='fixed top-0 left-0 w-16 h-screen text-white flex items-center gap-4 cursor-pointer'>
                        <SlArrowRight title='Abrir menu' size={30} onClick={() => setIsOpen(!isOpen)} className='hover:scale-125 transition-all' />
                    </div>
                )
            }
        </div>
    );
} 
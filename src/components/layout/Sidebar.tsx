'use client';
import { HomeIcon, FolderIcon, ClockIcon, CogIcon, TableCellsIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { motion } from 'framer-motion';

const menuItems = [
    { name: 'Dashboard', icon: HomeIcon, href: '/' },
    { name: 'OLTs', icon: TableCellsIcon, href: '/page/olts' },
    { name: 'Diretórios', icon: FolderIcon, href: '/diretorios' },
    { name: 'Histórico', icon: ClockIcon, href: '/historico' },
    { name: 'Configurações', icon: CogIcon, href: '/configuracoes' },
];

export default function Sidebar() {
    return (
        <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="h-screen w-64 bg-gray-900 text-white p-4 fixed left-0 top-0"
        >
            <div className="mb-8">
                <h1 className="text-xl font-bold">FTP Backup Manager</h1>
            </div>

            <nav>
                {menuItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        <item.icon className="h-5 w-5" />
                        <span>{item.name}</span>
                    </Link>
                ))}
            </nav>
        </motion.div>
    );
} 
'use client';

import { useEffect, useState } from 'react';
import { FolderIcon, ClockIcon, CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import Sidebar from '@/components/layout/Sidebar';
import StatusCard from '@/components/dashboard/StatusCard';
import DirectoryList from '@/components/dashboard/DirectoryList';
import AddDirectoryForm from '@/components/dashboard/AddDirectoryForm';

export default function Dashboard() {
  const [directories, setDirectories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalDirs: 0,
    totalOlts: 0,
    lastBackup: '',
    successRate: '0%',
  });

  useEffect(() => {
    // Carregar diretórios e estatísticas
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const dirs = await fetch('/api/diretorios').then(res => res.json());
      const olts = await fetch('/api/olts').then(res => res.json());
      stats.totalOlts = olts.length;
      setDirectories(dirs);
      setLoading(false);
      // Aqui você pode carregar as estatísticas também
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  const handleAddDirectory = async (path: string) => {
    try {
      await fetch('/api/diretorios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path }),
      });
      fetchData();
    } catch (error) {
      console.error('Erro ao adicionar diretório:', error);
    }
  };

  const handleDeleteDirectory = async (id: number) => {
    try {
      await fetch(`/api/diretorios/${id}`, { method: 'DELETE' });
      fetchData();
    } catch (error) {
      console.error('Erro ao deletar diretório:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      <main className="ml-64 p-8">
        <h1 className="text-2xl font-bold mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatusCard
            title="Total de OLTs"
            value={stats.totalOlts}
            icon={<FolderIcon className="h-8 w-8" />}
            color="bg-blue-500"
          />
          <StatusCard
            title="Último Backup"
            value={stats.lastBackup || 'N/A'}
            icon={<ClockIcon className="h-8 w-8" />}
            color="bg-green-500"
          />
          <StatusCard
            title="Taxa de Sucesso"
            value={stats.successRate}
            icon={<CheckCircleIcon className="h-8 w-8" />}
            color="bg-purple-500"
          />
        </div>

        <div className="space-y-6">
          <AddDirectoryForm onAdd={handleAddDirectory} />
          <DirectoryList
            directories={directories}
            onDelete={handleDeleteDirectory}
          />
        </div>
      </main>
    </div>
  );
}

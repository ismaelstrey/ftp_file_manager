'use client';
import { useState } from 'react';
import { ClockIcon, CheckCircleIcon, TableCellsIcon } from '@heroicons/react/24/outline';

import StatusCard from '@/components/dashboard/StatusCard';
import Link from 'next/link';
import useFetch from '@/hooks/useFetch';

export default function Dashboard() {
  const { olts, backup } = useFetch();

  const [stats, setStats] = useState({
    totalDirs: 0,
    lastBackup: '',
    successRate: '0%',
  });

  // if (backup) {
  //   console.log(backup, olts)
  // }






  return (


    <main className="ml-64 p-8">
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link href="/page/olts">
          <StatusCard
            title="Total de OLTs"
            value={olts.length}
            icon={<TableCellsIcon className="h-8 w-8" />}
            color="bg-blue-500"
          />
        </Link>
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

      {/* <div className="space-y-6">
        <AddDirectoryForm onAdd={handleAddDirectory} />
        <DirectoryList
          directories={directories}
          onDelete={handleDeleteDirectory}
        />
      </div> */}
    </main>

  );
}

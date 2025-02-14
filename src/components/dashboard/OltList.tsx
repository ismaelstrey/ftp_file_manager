import { motion } from 'framer-motion';
import { TableCellsIcon } from '@heroicons/react/24/outline';
import { BackupListAll } from '@/app/types/OltTypes';
import Link from 'next/link';
import IsBackup from './_backup';
interface OltListProps {
    olts: BackupListAll[];
}
export default function OltList({ olts }: OltListProps) {

    return (
        <div className="bg-white rounded-xl shadow-xs p-6">
            <div className='flex justify-between'>
                <h2 className="text-xl font-semibold mb-4">Olts monitoradas </h2>
                <span>Total: {olts.length}</span></div>
            <div className="space-y-3">
                {olts.map((olt, key) => (
                    <Link key={key} href={`/page/olts/${olt.olt}`} className='flex flex-col gap-3'>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <TableCellsIcon className="h-5 w-5 text-blue-500" />
                                <div>
                                    <p className="font-medium">{olt.olt}</p>
                                </div>
                            </div>
                            <div>
                                <IsBackup data={olt.data} type='data' size={olt.sizeData} />
                                <IsBackup data={olt.config} type='config' size={olt.sizeConfig} />
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </div>
    );
} 
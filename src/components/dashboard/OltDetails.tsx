import { motion } from 'framer-motion';
import { ArrowLeftIcon, ArrowUturnLeftIcon, TableCellsIcon } from '@heroicons/react/24/outline';
import { Olts } from '@/app/types/OltTypes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
interface OltListProps {
    olt: Olts;
}
export default function OltDetails({ olt }: OltListProps) {
    const router = useRouter();
    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <div className='flex justify-between'>
                <h2 className="text-xl font-semibold mb-4">Olts monitoradas </h2>
                <ArrowUturnLeftIcon title='Voltar' onClick={() => router.back()} className="h-5 w-5 text-blue-500 mr-8 cursor-pointer hover:scale-125" />


            </div>
            <div className="space-y-3">

                <motion.div
                    key={olt.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                    <div className="flex items-center gap-3">
                        <TableCellsIcon className="h-5 w-5 text-blue-500" />
                        <div>
                            <Link href={`/page/olts/${olt.name}`}>Detalhes</Link>
                            <p className="font-medium">{olt.name}</p>
                            {olt.lastBackup && (
                                <p className="text-sm text-gray-500">
                                    Último backup: {olt.lastBackup}
                                </p>
                            )}
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
} 
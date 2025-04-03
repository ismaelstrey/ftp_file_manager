import { motion } from 'framer-motion';
import { ArrowUturnLeftIcon, TableCellsIcon } from '@heroicons/react/24/outline';
import { BackupListAll } from '@/app/types/OltTypes';
import { useRouter } from 'next/navigation';
import IsBackup from './_backup';
import OltDetail from './_oltDetail';

export default function OltDetails({ oltData }: { oltData?: BackupListAll }) {
    const router = useRouter();
    return (
        <div className="bg-zinc-800 rounded-xl shadow-xs p-6">
            <div className='flex justify-between'>
                <span></span>
                <ArrowUturnLeftIcon title='Voltar' onClick={() => router.back()} className="h-10 w-10 text-blue-500 mr-8 cursor-pointer hover:scale-125" />
            </div>
            <div className="space-y-3">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between p-4 rounded-lg"
                >                    <div className="flex flex-col w-full items-center gap-3">
                        <div className='flex w-full justify-between gap-3'>
                            <div className="flex items-center gap-3">
                                <TableCellsIcon className="h-5 w-5 text-blue-500" />
                                <div>
                                    <p className="font-medium">{oltData?.olt}</p>
                                </div>
                            </div>
                            <div>
                                <IsBackup data={oltData?.data} type='data' size={oltData?.sizeData} />
                                <IsBackup data={oltData?.config} type='config' size={oltData?.sizeConfig} />
                            </div>
                        </div>
                        <div className='flex w-full justify-between gap-3'>
                            <OltDetail data={oltData?.data} type='data' />
                            <OltDetail data={oltData?.config} />
                     
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
} 
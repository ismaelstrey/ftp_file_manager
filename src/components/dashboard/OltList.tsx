import { motion } from 'framer-motion';
import { TableCellsIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import IsBackup from './_backup';
import { useQuery } from '@tanstack/react-query';
interface OltListProps {
    olts: string;
}
export default function OltList({ olts }: OltListProps) {
    const { isPending, error, data: bkpOlt } = useQuery({
        queryKey: ['bkpOlt', olts],

        queryFn: () =>
            fetch(`/api/olts/bkp/${olts}`).then((res) =>
                res.json(),
            ),
    },

    )

    if (isPending) return `${olts} Loading...`

    if (error) return 'An error has occurred: ' + error.message
    return (

        <div className="space-y-3">

            <Link href={`/page/olts/${bkpOlt.olt}`} className='flex flex-col gap-3'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                    <div className="flex items-center gap-3">
                        <TableCellsIcon className="h-5 w-5 text-blue-500" />
                        <div>
                            <p className="font-medium">{bkpOlt.olt}</p>
                        </div>
                    </div>
                    <div>
                        <IsBackup data={bkpOlt.data} type='data' size={bkpOlt.sizeData} />
                        <IsBackup data={bkpOlt.config} type='config' size={bkpOlt.sizeConfig} />
                    </div>
                </motion.div>
            </Link>

        </div>

    );
} 
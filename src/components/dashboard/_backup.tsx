
import { Olt } from '@/app/types/OltTypes'
import { diaAnterior } from '@/helper/date';
import { ServerStackIcon } from '@heroicons/react/24/outline'
export default function IsBackup({ data, type }: { data?: Olt[], type?: string }) {
    const dia = data?.filter((item) => item.date === diaAnterior());
    return (
        <div>
            <div className='flex items-center gap-8'>
                <div className='flex items-center gap-4 w-32'>
                    <span className='flex items-center gap-4 w-12'>{data?.length}
                    </span>{type === 'data' ? 'Data' : 'Config'}</div>
                <span>
                    {dia?.map((bkp, key) =>
                        <ServerStackIcon key={key} className={`w-5 h-5 text-green-400 ${type === 'data' ? ' text-blue-400' : ''}`} title={`Backup realizado: ${bkp.name}` || ''} />
                    )}
                </span>
            </div>
        </div>
    )
}

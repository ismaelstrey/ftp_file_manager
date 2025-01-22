
import { Olt } from '@/app/types/OltTypes'
import { bytesToMB } from '@/helper/conversor';
import { diaAnterior } from '@/helper/date';
import { ServerStackIcon } from '@heroicons/react/24/outline'
export default function IsBackup({ data, type, size }: { data?: Olt[], type?: string, size?: number }) {
    const dia = data?.filter((item) => item.date === diaAnterior());
    return (
        <div>
            <div className='flex items-center gap-8'>
                <div className='flex items-center gap-4 w-60'>
                    <span className={`flex items-center gap-4 w-20 ${type === 'data' ? ' text-blue-400' : 'text-green-400'}`}> Total:  {data?.length} </span>
                    <span className={` ${type === 'data' ? ' text-blue-400' : 'text-green-400'}`}>{type === 'data' ? 'Data' : 'Config'}: {size && bytesToMB(size)} MB</span>
                </div>
                <span>
                    {dia?.map((bkp, key) =>
                        <ServerStackIcon key={key} className={`w-5 h-5 text-green-400 ${type === 'data' ? ' text-blue-400' : ''}`} title={`Backup realizado: ${bkp.name}` || ''} />
                    )}
                </span>
            </div>
        </div>
    )
}

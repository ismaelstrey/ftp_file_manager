
import { Backup } from '@/app/types/OltTypes'
import { diaAnterior } from '@/helper/date';
import { ServerStackIcon } from '@heroicons/react/24/outline'


export default function IsBackup({ data }: { data?: Backup[] }) {
    console.log(diaAnterior());
    const config = data?.filter((item) => item.type === 'dat');
    const dia = data?.filter((item) => item.date === diaAnterior());
    return (
        <div>
            <span>{config?.length}</span>
            <span>{dia?.map((bkp, key) =>
                <ServerStackIcon key={key} className=' w-5 h-5' title={bkp.name || ''} />
            )}</span>

            {data?.map((bkp, key) => {
                // console.log(bkp.date)
                return <div key={key} className={`flex items-center justify-center hover:scale-125 ${bkp ? 'text-green-500' : 'text-red-500'}`}>
                    {/* <ServerStackIcon className=' w-5 h-5' title={bkp.name || ''} /> */}
                </div>
            })}</div>
    )
}

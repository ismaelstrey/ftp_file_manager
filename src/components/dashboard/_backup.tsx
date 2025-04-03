
import { Olt } from '@/app/types/OltTypes'
import { bytesToMB } from '@/helper/conversor';
import { diaAnterior } from '@/helper/date';
import { ServerStackIcon } from '@heroicons/react/24/outline'
export default function IsBackup({ data, type, size }: { data?: Olt[], type?: string, size?: number }) {
    const dia:Olt[] | undefined = data?.filter((item) => item.date === diaAnterior());
    console.log(dia)
    return (
        <div>
            <div className='flex items-center gap-8'>
                <div className='flex items-center gap-4 w-60'>
                    <span className={`flex items-center gap-4 w-20 ${type === 'data' ? ' text-blue-400' : 'text-green-400'}`}> Total:  {data?.length} </span>
                    <span className={` ${type === 'data' ? ' text-blue-400' : 'text-green-400'}`}>{type === 'data' ? 'Data' : 'Config'}: {size && bytesToMB(size)} MB</span>
                </div>
                <span>
                    { dia && dia.length > 0 ? dia.map((bkp, key) =>
                        <ServerStackIcon key={key} className={`w-5 h-5  ${type === 'data' ? ' text-blue-400' : 'text-green-400'}`} title={`Backup realizado: ${bkp.name}` || ''} />
                    ) : <span title='Ouve um erro ao gerar o BKP verifique as configuraçoes na OLT' className='flex bg-red-500/50 p-2 rounded-3xl m-1 text-sm'>Erro ao gerar BKP</span>}
                </span>
            </div>
        </div>
    )
}

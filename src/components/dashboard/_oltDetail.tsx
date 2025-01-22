import React from 'react'
import { motion } from 'framer-motion';
import { Olt } from '@/app/types/OltTypes';
import { TableCellsIcon } from '@heroicons/react/24/outline';

export default function OltDetail({ data, type }: { data?: Olt[], type?: string }) {
    return (
        <div className={`flex w-full flex-col ${type === 'data' ? ' bg-blue-400' : 'bg-green-400'} `}>

            <div className="flex flex-col items-center gap-3">
                <div>  <h2>{type || "Config"}</h2> </div>

                {data?.map((bkp, key) =>
                    <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <TableCellsIcon className={`h-5 w-5 ${type === 'data' ? ' text-blue-400' : 'text-green-400'} `} />
                            <div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>
                                                Tipo
                                            </th>
                                            <th>Detalhes</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <td className='font-medium'>Olt:</td>
                                            <td className='font-medium'>{bkp?.name}</td>

                                        </tr>
                                        <tr>
                                            <td className='font-medium'>Data:</td>
                                            <td className='font-medium'>{bkp?.date}</td>
                                        </tr>
                                        <tr>
                                            <td className='font-medium'>Tamanho:</td>
                                            <td className='font-medium'>{bkp?.size}</td>
                                        </tr>
                                        <tr>
                                            <td className='font-medium'>Tipo:</td>
                                            <td className='font-medium'>{bkp?.type}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div>
                            {/* <IsBackup data={bkp?.olt} type='data' />
                                                <IsBackup data={bkp?.type} type='config' /> */}
                        </div>
                    </motion.div>
                )
                }
            </div>
        </div>
    )
}

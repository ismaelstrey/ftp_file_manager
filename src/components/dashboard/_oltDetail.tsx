import React from 'react'
import { motion } from 'framer-motion';
import { Olt } from '@/app/types/OltTypes';
import { bytesToMB } from '@/helper/conversor';

export default function OltDetail({ data, type }: { data?: Olt[], type?: string }) {
    const sortedData = data?.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA; // Ordem decrescente (mais recente primeiro)
    });

    console.log(data)
    return (
        <div className={`flex w-full rounded-lg p-4 flex-col ${type === 'data' ? ' bg-blue-400' : 'bg-green-400'} `}>

            <div className="flex flex-col items-center gap-3">
                <div>  <h2 className='text-2xl font-semibold text-white capitalize'>{type || "Config"}</h2> </div>

                {sortedData?.map((bkp, key) =>
                    <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <div>
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Tipo
                                            </th>
                                            <th scope="col" className="px-6 py-3">Detalhes</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td className='font-medium px-6 py-4'>Olt:</td>
                                            <td className='font-medium px-6 py-4'>{bkp?.name}</td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td className='font-medium px-6 py-4'>Data:</td>
                                            <td className='font-medium px-6 py-4'>{bkp?.date}</td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td className='font-medium px-6 py-4'>Tamanho:</td>
                                            <td className='font-medium px-6 py-4'>{bytesToMB(bkp?.size)} MB </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td className='font-medium px-6 py-4'>Tipo:</td>
                                            <td className='font-medium px-6 py-4'>{bkp?.type}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div>
                        </div>
                    </motion.div>
                )
                }
            </div>
        </div>
    )
}

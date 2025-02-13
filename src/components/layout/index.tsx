import { OltProvider } from '@/context/OltContext'
import React from 'react'

export default function Main({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <OltProvider>
                {children}
            </OltProvider>
        </div>


    )
}

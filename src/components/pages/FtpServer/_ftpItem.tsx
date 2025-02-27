import { FtpServerType } from '@/app/types/FtpServersTypes'
import React from 'react'

export default function ServerFtpItem({ id, host, port, username, password, createdAt }: FtpServerType) {
    return (
        <div className='bg-white rounded-lg p-4'>
            <h3>Servidor:</h3>
            <p>ID: {id}</p>
            <p>Host: {host}</p>
            <p>Porta: {port}</p>
            <p>Usuário: {username}</p>
            <p>Senha: {password}</p>
            <p>Criado em: {new Date(createdAt).toLocaleString()}</p>
        </div>
    )
}

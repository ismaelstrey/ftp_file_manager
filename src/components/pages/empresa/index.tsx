import React from 'react'
import EmpresaList from './empresaList'
import EmpresaForm from './empresaForm'

export default function PageEmpresa() {
    return (
        <div>
            <div>PageEmpresa</div>

            <div><EmpresaForm /></div>
            <div><EmpresaList /></div>
        </div>
    )
}

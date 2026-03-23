'use client'

import api from "@/lib/axios"

export default function Data() {
    const token = localStorage.getItem('token-MS')

    const submitEmail = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const email = (e.target as HTMLInputElement).value

            const subject = 'Vindo do message sender'

            const html = `<p>Oi!</p><p>Esse é um email de teste.</p>`

            api.post('/email/send', { to: email, subject, html })
        }
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex justify-center items-center gap-2 mt-12">
            <h1 className="text-5xl">Data |</h1>
            <div className="text-5xl">
                {token ? <p className="text-green-600">Logado</p> : <p className="text-red-600">Deslogado</p>}
            </div>
        </div>
        <div className="mt-12">
            <h2 className="text-3xl">Envie um email</h2>

            <input onKeyDown={submitEmail} type="email" placeholder="Email" className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        </div>
    )
}
'use client'

import useAuthGuard from "@/hooks/useAuthGuard";
import { useRouter } from 'next/navigation'
import { logout, getUserInfo } from '@/utils/auth'
import { useEffect, useState } from 'react'


export default function DashboardPage() {
  const router = useRouter()
  const [username, setUsername] = useState('Pistacchio')

  useEffect(() => {
    async function fetchUser() {
      const data = await getUserInfo()
      if (data?.first_name) {
        setUsername(data.first_name)
      }
    }
    fetchUser()
  }, [])

  const { loading } = useAuthGuard();

  if (loading) return <div className="text-center mt-10">Caricamento...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl">Benvenuto nella Dashboard, {username}</h1>
        <p className="mt-4">Questa è la tua dashboard personale.</p>
        <button
            className="mt-4 bg-red-500 text-white p-2 rounded"
            onClick={() => {
                logout()
                router.push('/login')
            }}
        >
            Logout
        </button>
    </div>
  )
}
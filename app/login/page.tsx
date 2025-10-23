'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, User } from 'lucide-react'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data.error || 'Login failed')
        return
      }
      router.push('/admin')
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className='min-h-screen w-full flex items-center justify-center bg-background p-4'>
      <div className='w-full max-w-md'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold mb-2'>Admin Login</h1>
          <p className='text-muted-foreground'>Sign in to manage your store</p>
        </div>
        <div className='bg-card border rounded-lg p-8 shadow-lg'>
          <form onSubmit={handleLogin} className='space-y-6'>
            <div>
              <label className='block text-sm font-medium mb-2'>Username</label>
              <div className='relative'>
                <User className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground' />
                <input
                  type='text'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className='w-full pl-10 pr-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary'
                  placeholder='Enter username'
                  required
                />
              </div>
            </div>
            <div>
              <label className='block text-sm font-medium mb-2'>Password</label>
              <div className='relative'>
                <Lock className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground' />
                <input
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='w-full pl-10 pr-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary'
                  placeholder='Enter password'
                  required
                />
              </div>
            </div>
            {error && (
              <div className='text-sm text-red-500 text-center'>{error}</div>
            )}
            <button
              type='submit'
              disabled={loading}
              className='w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-60'
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
          <div className='mt-6 text-center text-sm text-muted-foreground'>
            Demo credentials: admin / admin123
          </div>
        </div>
      </div>
    </div>
  )
}

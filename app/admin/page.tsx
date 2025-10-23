'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Upload,
  Trash2,
  Edit,
  LogOut,
  Image as ImageIcon,
  Loader2,
} from 'lucide-react'

interface BannerDoc {
  _id: string
  image: string
  alt: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [banners, setBanners] = useState<BannerDoc[]>([])
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  // Track per-banner updating state
  const [updatingIds, setUpdatingIds] = useState<Set<string>>(new Set())
  // Custom delete dialog state
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  const startUpdating = (id: string) =>
    setUpdatingIds((prev) => new Set([...prev, id]))
  const stopUpdating = (id: string) =>
    setUpdatingIds((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  const isUpdating = (id: string) => updatingIds.has(id)
  useEffect(() => {
    const init = async () => {
      try {
        // Optional: verify session; middleware also guards /admin
        const me = await fetch('/api/me', { credentials: 'include' }).then(
          (r) => r.json()
        )
        if (!me?.authenticated) {
          router.push('/login')
          return
        }
        const res = await fetch('/api/banners', { credentials: 'include' })
        const data = await res.json()
        setBanners(data)
      } catch {
        setError('Failed to load banners')
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [router])
  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST', credentials: 'include' })
    router.push('/login')
  }
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const reader = new FileReader()
    reader.onloadend = () => {
      const payload = { image: reader.result as string, alt: file.name }
      ;(async () => {
        try {
          const res = await fetch('/api/banners', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(payload),
          })
          if (!res.ok) throw new Error('Failed to create')
          const created: BannerDoc = await res.json()
          setBanners((prev) => [created, ...prev])
        } catch {
          setError('Upload failed')
        } finally {
          setUploading(false)
        }
      })()
    }
    reader.readAsDataURL(file)
  }
  // Open custom delete dialog
  const handleDelete = (id: string) => {
    setPendingDeleteId(id)
  }

  const closeDeleteDialog = () => {
    if (!deleting) setPendingDeleteId(null)
  }

  const confirmDelete = async () => {
    if (!pendingDeleteId) return
    try {
      setDeleting(true)
      const res = await fetch(`/api/banners/${pendingDeleteId}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      if (!res.ok) throw new Error('Delete failed')
      setBanners((prev) => prev.filter((b) => b._id !== pendingDeleteId))
      setPendingDeleteId(null)
    } catch {
      setError('Delete failed')
    } finally {
      setDeleting(false)
    }
  }
  const handleUpdate = (id: string) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return
      const reader = new FileReader()
      reader.onloadend = () => {
        ;(async () => {
          try {
            startUpdating(id)
            const res = await fetch(`/api/banners/${id}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
              body: JSON.stringify({ image: reader.result as string }),
            })
            if (!res.ok) throw new Error('Update failed')
            const updated: BannerDoc = await res.json()
            setBanners((prev) => prev.map((b) => (b._id === id ? updated : b)))
          } catch {
            setError('Update failed')
          } finally {
            stopUpdating(id)
          }
        })()
      }
      reader.readAsDataURL(file)
    }
    input.click()
  }
  return (
    <div className='min-h-screen w-full bg-background'>
      <header className='border-b bg-card'>
        <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
          <h1 className='text-2xl font-bold'>Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className='flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-accent'
          >
            <LogOut className='h-4 w-4' />
            Logout
          </button>
        </div>
      </header>
      <main className='container mx-auto px-4 py-8'>
        {error && (
          <div className='mb-4 text-sm text-red-500 text-center'>{error}</div>
        )}
        {loading ? (
          <div className='text-center text-muted-foreground'>Loading…</div>
        ) : (
          <>
            <div className='mb-8'>
              <h2 className='text-2xl font-bold mb-4'>Banner Management</h2>
              <label className='inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg cursor-pointer hover:bg-primary/90 transition-colors'>
                <Upload className='h-5 w-5' />
                Upload New Banner
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleFileUpload}
                  className='hidden'
                  disabled={uploading}
                />
              </label>
              {uploading && (
                <span className='ml-4 text-sm text-muted-foreground'>
                  Uploading...
                </span>
              )}
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {banners.map((banner) => (
                <div
                  key={banner._id}
                  className='group relative rounded-lg border bg-card overflow-hidden'
                >
                  <div className='aspect-video'>
                    {/* Use Next.js Image for optimization if banner.image is a remote URL */}

                    {banner.image.startsWith('http') ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={banner.image}
                        alt={banner.alt}
                        className='w-full h-full object-cover'
                      />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={banner.image}
                        alt={banner.alt}
                        className='w-full h-full object-cover'
                      />
                    )}
                  </div>
                  <div
                    className={
                      'absolute inset-0 bg-black/60 transition-opacity flex items-center justify-center gap-4 ' +
                      (isUpdating(banner._id)
                        ? 'opacity-100'
                        : 'opacity-0 group-hover:opacity-100')
                    }
                  >
                    {isUpdating(banner._id) ? (
                      <div className='flex items-center gap-2 text-primary-foreground'>
                        <Loader2 className='h-5 w-5 animate-spin' />
                        <span className='text-sm'>Updating…</span>
                      </div>
                    ) : (
                      <>
                        <button
                          onClick={() => handleUpdate(banner._id)}
                          className='p-3 bg-card rounded-lg hover:bg-muted transition-colors'
                          title='Update'
                        >
                          <Edit className='h-5 w-5 text-foreground' />
                        </button>
                        <button
                          onClick={() => handleDelete(banner._id)}
                          className='p-3 bg-destructive rounded-lg hover:bg-destructive/90 transition-colors'
                          title='Delete'
                        >
                          <Trash2 className='h-5 w-5 text-destructive-foreground' />
                        </button>
                      </>
                    )}
                  </div>
                  <div className='p-4'>
                    <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                      <ImageIcon className='h-4 w-4' />
                      <span className='truncate'>{banner.alt}</span>
                    </div>
                  </div>
                </div>
              ))}
              {banners.length === 0 && (
                <div className='col-span-full text-center py-12 text-muted-foreground'>
                  No banners uploaded yet. Upload your first banner to get
                  started.
                </div>
              )}
            </div>
          </>
        )}
      </main>
      {/* Delete confirmation dialog */}
      {pendingDeleteId && (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
          <div
            className='absolute inset-0 bg-black/60 backdrop-blur-sm'
            onClick={closeDeleteDialog}
          />
          <div
            className='relative w-full max-w-md mx-4 rounded-lg border bg-card shadow-xl'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='p-6'>
              <h3 className='text-lg font-semibold mb-2'>Delete banner?</h3>
              <p className='text-sm text-muted-foreground mb-4'>
                This action cannot be undone. This will permanently delete the
                banner.
              </p>
              {/* Preview */}
              {(() => {
                const b = banners.find((x) => x._id === pendingDeleteId)
                if (!b) return null
                return (
                  <div className='mb-4 rounded overflow-hidden border'>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={b.image}
                      alt={b.alt}
                      className='w-full h-40 object-cover'
                    />
                  </div>
                )
              })()}
              <div className='flex justify-end gap-2'>
                <button
                  onClick={closeDeleteDialog}
                  disabled={deleting}
                  className='px-4 py-2 rounded-md border hover:bg-muted disabled:opacity-50'
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={deleting}
                  className='px-4 py-2 rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90 disabled:opacity-50 inline-flex items-center gap-2'
                >
                  {deleting && <Loader2 className='h-4 w-4 animate-spin' />}
                  {deleting ? 'Deleting…' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

import React from 'react'
import Link from 'next/link'
export default function Footer() {
  return (
    <footer className='w-full border-t bg-card mt-12'>
      <div className='container mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          <div>
            <h3 className='text-xl font-bold mb-4'>ShopHub</h3>
            <p className='text-sm text-muted-foreground'>
              Your one-stop shop for everything you need.
            </p>
          </div>
          <div>
            <h4 className='font-semibold mb-4'>Quick Links</h4>
            <div className='flex flex-col gap-2'>
              <Link
                href='/'
                className='text-sm text-muted-foreground hover:text-foreground'
              >
                Home
              </Link>
              <Link
                href='/about'
                className='text-sm text-muted-foreground hover:text-foreground'
              >
                About
              </Link>
              <Link
                href='/contact'
                className='text-sm text-muted-foreground hover:text-foreground'
              >
                Contact
              </Link>
            </div>
          </div>
          <div>
            <h4 className='font-semibold mb-4'>Customer Service</h4>
            <div className='flex flex-col gap-2'>
              <Link
                href='/help'
                className='text-sm text-muted-foreground hover:text-foreground'
              >
                Help Center
              </Link>
              <Link
                href='/shipping'
                className='text-sm text-muted-foreground hover:text-foreground'
              >
                Shipping Info
              </Link>
              <Link
                href='/returns'
                className='text-sm text-muted-foreground hover:text-foreground'
              >
                Returns
              </Link>
            </div>
          </div>
          <div>
            <h4 className='font-semibold mb-4'>Legal</h4>
            <div className='flex flex-col gap-2'>
              <Link
                href='/privacy'
                className='text-sm text-muted-foreground hover:text-foreground'
              >
                Privacy Policy
              </Link>
              <Link
                href='/terms'
                className='text-sm text-muted-foreground hover:text-foreground'
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
        <div className='mt-8 pt-8 border-t text-center text-sm text-muted-foreground'>
          © 2024 ShopHub. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

"use client"
import { Button } from '@/components/ui/button'
import { SignInButton, UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

function Header() {
  const { user, isSignedIn } = useUser();
  const path = usePathname();

  useEffect(() => {
    console.log(path)
  }, [])

  return !path.includes('aiform') && (
    <div className='p-3 md:px-5 px-3 border-b shadow-sm'>
      <div className='flex items-center justify-between flex-col md:flex-row'>
        {/* Custom Tailwind Logo */}
        <div className="flex items-center">
          <span className="text-2xl md:text-3xl font-bold text-blue-500">Formify</span>
          <span className="text-2xl md:text-3xl font-bold text-yellow-500 ml-1">AI</span>
        </div>

        {isSignedIn ? (
          <div className='flex items-center gap-3 md:gap-5 mt-3 md:mt-0'>
            <Link href={'/dashboard'}>
              <Button variant="outline">Dashboard</Button>  
            </Link>
            <UserButton />
          </div>
        ) : (
          <SignInButton>
            <Button className="mt-3 md:mt-0">Get Started</Button>
          </SignInButton>
        )}
      </div>
    </div>
  )
}

export default Header;

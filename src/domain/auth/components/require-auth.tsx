import { JSX, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../use-auth-store'

export function RequireAuth({ children }: { children: JSX.Element }) {
  const user = useAuthStore((state) => state.user)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = useAuthStore.subscribe((state) => {
      if (state.user !== null) {
        setIsLoading(false)
      }
    })

    return () => unsubscribe()
  }, [])

  if (isLoading) {
    return <p>Loading...</p>
  }

  return user ? children : <Navigate to='/sign-in' />
}

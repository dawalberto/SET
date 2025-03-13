import { Button } from '@/components'
import { useAuthStore } from '@/domain/auth/use-auth-store'
import { useGroups } from '../hooks/use-groups'

export const Groups = () => {
  const user = useAuthStore((state) => state.user)
  const { data: groups, isLoading, isError } = useGroups(user?.id)

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error loading groups</p>

  return (
    <div>
      <h1 className='text-2xl font-bold'>Groups</h1>
      <Button onClick={() => alert('Create Group')}>Create Group</Button>
      {/* Render groups list */}
    </div>
  )
}

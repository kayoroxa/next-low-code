import { revalidatePath } from 'next/cache'

export default function Button() {
  async function deleteUser() {
    'use server'
    fetch('http://localhost:3000/api/users/4', {
      method: 'DELETE',
      cache: 'no-store',
    })
    revalidatePath('/')
  }

  return <button formAction={deleteUser}>Button</button>
}

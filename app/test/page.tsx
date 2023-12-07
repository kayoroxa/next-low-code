import { create } from '../actions'

export default async function Page() {
  async function getAll() {
    'use server'
    const response = await fetch('http://localhost:3000/api/users', {
      cache: 'no-store',
      next: { tags: ['mi'] },
    })

    return response.json()
  }

  async function getRandom() {
    'use server'
    return Math.random() * 100
  }

  const users = await getAll()

  return (
    <div>
      <div>{getRandom()}</div>
      {users.map((user: any) => (
        <p key={user.id}>{user.name}</p>
      ))}
      <form action={create}>
        <input type="number" name="number" className="border" />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

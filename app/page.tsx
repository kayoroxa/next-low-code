import { DialogCloseButton } from '@/components/dialogue'
import MyForm from '@/components/form'

export default async function Home() {
  const response = await fetch('http://localhost:3000/api/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    // Tratar erro de resposta aqui
    console.error('Erro na requisição:', response.status)
    return
  }

  const users = await response.json()

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      {users.map((user: any) => (
        <p key={user.id}>{user.name}</p>
      ))}
      <DialogCloseButton>
        <MyForm />
      </DialogCloseButton>
    </main>
  )
}

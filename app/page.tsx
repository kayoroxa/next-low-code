import { addUser } from '@/app/actions'
import CardContainer from '@/components/cardContainer'
import MyFormModal from '@/components/formModal'
import { Button } from '@/components/ui/button'
import { propsSchemaFormUser } from '@/types/Zuser'

export default async function Home() {
  const response = await fetch('http://localhost:3000/api/users', {
    cache: 'no-store',
    next: { tags: ['users'] },
  })
  // async function getAll() {
  //   'use server'
  //   const response = await fetch('http://localhost:3000/api/users', {
  //     cache: 'no-store',
  //     next: { tags: ['users'] },
  //   })

  //   if (!response.ok) {
  //     // Tratar erro de resposta aqui
  //     console.error('Erro na requisição:', response.status)
  //     return
  //   }

  //   return response.json()
  // }

  const users = await response.json()

  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-4">
      <div className="flex w-full gap-2 flex-wrap">
        {users.map((user: any) => (
          <CardContainer key={user.id}>
            <p key={user.id} className="truncate">
              {user.name}
            </p>
          </CardContainer>
        ))}
      </div>

      <MyFormModal onSubmit={addUser} propsSchema={propsSchemaFormUser}>
        <Button type="button">Create new user</Button>
      </MyFormModal>

      {/* <DialogCloseButton></DialogCloseButton> */}
    </main>
  )
}

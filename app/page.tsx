import { serverAdd, serverDelete, serverEdit } from '@/app/actions'
import CardContainer from '@/components/cardContainer'
import MyFormModal from '@/components/formModal'
import { Button } from '@/components/ui/button'
import { propsSchemaFormUser } from '@/types/Zuser'
import { User } from '@prisma/client'

export default async function Home() {
  const response = await fetch('http://localhost:3000/api/users', {
    cache: 'no-store',
    next: { tags: ['users'] },
  })

  const users = await response.json()

  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-4">
      <div className="flex w-full gap-2 flex-wrap">
        {users.map((user: User) => (
          <CardContainer
            key={user.id}
            onDelete={serverDelete}
            onEdit={serverEdit}
            id={user.id}
            data={user}
          >
            <p key={user.id} className="truncate">
              {user.name}
            </p>
          </CardContainer>
        ))}
      </div>

      <MyFormModal
        onSubmit={serverAdd}
        propsSchema={propsSchemaFormUser}
        method="create"
      >
        <Button type="button">Create new user</Button>
      </MyFormModal>

      {/* <DialogCloseButton></DialogCloseButton> */}
    </main>
  )
}

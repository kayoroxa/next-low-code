import ButtonFormCreate from '@/components/buttonForm'
import CardContainer from '@/components/cardContainer'

import { User } from '@prisma/client'
// import * as schemas from '../prisma/generated/zod/index'

export default async function Home() {
  const response = await fetch('http://localhost:3000/api/users', {
    cache: 'no-store',
    next: { tags: ['users'] },
  })

  const users = await response.json()

  const model = 'User'

  // const propsSchemaFormUser = {
  //   formSchema: schemas[`UserSchema`],
  //   fieldConfig: {},
  // }

  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-4">
      <div className="flex w-full gap-2 flex-wrap">
        {users.map((user: User) => (
          <CardContainer key={user.id} id={user.id} model={model}>
            <p key={user.id} className="truncate">
              {user.name}
            </p>
          </CardContainer>
        ))}
      </div>

      <ButtonFormCreate model={model}>Create new user</ButtonFormCreate>
    </main>
  )
}

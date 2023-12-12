import ButtonFormCreate from '@/components/buttonForm'
import CardContainer from '@/components/cardContainer'

import { User } from '@prisma/client'
import { serverGet } from './actions'
// import * as schemas from '../prisma/generated/zod/index'

export default async function Home() {
  const users = await serverGet('User')

  const model = 'User'

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

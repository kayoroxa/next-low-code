import ButtonFormCreate from '@/components/buttonForm'
import CardContainer from '@/components/cardContainer'

import { Transaction } from '@prisma/client'
import { serverGet } from '../actions'

export default async function Home() {
  const model = 'Transaction'
  const transactions = await serverGet(model)

  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-4">
      <div className="flex w-full gap-2 flex-wrap">
        {transactions.map((transaction: Transaction) => (
          <CardContainer key={transaction.id} id={transaction.id} model={model}>
            {/* personalize seu card */}
            <div className="flex flex-col">
              <header>
                <p>{transaction.name}</p>
              </header>
              <main className="flex justify-between">
                {/* <p>{transaction}</p> */}
                <p
                  className={
                    transaction.isIncome
                      ? 'text-green-500 bold'
                      : 'text-red-500 bold'
                  }
                >
                  R$
                  {transaction.amount}
                </p>
              </main>
            </div>
          </CardContainer>
        ))}
      </div>

      <ButtonFormCreate model={model}>Create new Transaction</ButtonFormCreate>
    </main>
  )
}

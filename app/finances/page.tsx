import ButtonFormCreate from '@/components/buttonForm'
import CardContainer from '@/components/cardContainer'
import { propsSchemaFormTransaction } from '@/types/Ztransation'

import { Transaction } from '@prisma/client'

export default async function Home() {
  const response = await fetch('http://localhost:3000/api/transactions', {
    cache: 'no-store',
    next: { tags: ['transactions'] },
  })

  const transactions = await response.json()

  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-4">
      <div className="flex w-full gap-2 flex-wrap">
        {transactions.map((transaction: Transaction) => (
          <CardContainer
            key={transaction.id}
            id={transaction.id}
            model="Transaction"
            propsSchema={propsSchemaFormTransaction}
          >
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

      <ButtonFormCreate
        model="Transaction"
        propsSchema={propsSchemaFormTransaction}
      >
        Create new Transaction
      </ButtonFormCreate>
    </main>
  )
}

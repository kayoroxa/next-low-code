'use server'

import { Prisma } from '@prisma/client'
import { revalidateTag } from 'next/cache'

export async function serverAdd(type: Prisma.ModelName, newPayload: any) {
  if (!type) throw new Error('Type is required')

  await fetch(`http://localhost:3000/api/${type.toLowerCase()}s`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
    body: JSON.stringify(newPayload),
  })

  revalidateTag(type.toLowerCase() + 's')
}

export async function serverDelete(
  type: Prisma.ModelName,
  id: number | string
) {
  if (!type) throw new Error('Type is required')

  await fetch(`http://localhost:3000/api/${type.toLowerCase()}s/${id}`, {
    method: 'DELETE',
    cache: 'no-store',
  })

  revalidateTag(type.toLowerCase() + 's')
}

export async function serverEdit(
  type: Prisma.ModelName,
  newPayload: any,
  id: number | string
) {
  if (!type) throw new Error('Type is required')

  await fetch(`http://localhost:3000/api/${type.toLowerCase()}s/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
    body: JSON.stringify(newPayload),
  })

  console.log(type.toLowerCase() + 's')

  revalidateTag(type.toLowerCase() + 's')
}

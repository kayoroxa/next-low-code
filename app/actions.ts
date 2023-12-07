'use server'
import axios from 'axios'

import { revalidatePath, revalidateTag } from 'next/cache'

export async function addUser(newUser) {
  console.log(newUser)

  fetch('http://localhost:3000/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
    body: JSON.stringify(newUser),
  })

  revalidateTag('users')
}

export async function deleteAlls() {
  await axios.delete(`http://localhost:3000/api/users`)
  revalidatePath('/')
}

export async function create(formData: FormData) {
  'use server'
  console.log(formData)

  const number = formData.get('number')

  await fetch(`http://localhost:3000/api/users/${number}`, {
    method: 'DELETE',
    cache: 'no-store',
    body: formData,
  })
  revalidateTag('mi')
}

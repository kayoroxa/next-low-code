import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import * as z from 'zod'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const s = {
  string: z.string,
  number: z.coerce.number,
  date: z.coerce.date,
  boolean: z.boolean,
  select: z.enum,
  object: z.object,
}

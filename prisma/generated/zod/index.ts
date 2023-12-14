import { z } from 'zod'
    
    const ZUser = z.object({
  name: z.string().nullable().optional(),
  email: z.string().nullable().optional()
})

const ZCategory = z.object({
  name: z.string().nullable().optional(),
  color: z.string()
})

const ZTransaction = z.object({
  name: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  amount: z.coerce.number().min(1, {message: 'Amount must be greater than 1'}),
  isIncome: z.boolean().nullable().optional(),
  dateCreated: z.coerce.date()
})

const ZTest = z.object({
  name: z.string().nullable().optional(),
  email: z.string().nullable().optional()
})
    
    export const zSchemasForm = {
      User: ZUser, Category: ZCategory, Transaction: ZTransaction, Test: ZTest
    }
// import { s } from '@/lib/utils'
'use client'

import { s } from '@/lib/utils'

export const ZTransactions = s.object({
  name: s.string(), // Adapte conforme necessário
  description: s.string().nullable().optional(), // Adapte conforme necessário
  isIncome: s.boolean().optional(),
  amount: s.number().min(1, {
    message: 'Amount must be greater than 1',
  }),
  dateCreated: s.date().default(new Date()),
})

export const FTransactions = {
  isIncome: {
    description: 'Is it an income? 💹',
  },
}

export const propsSchemaFormTransaction = {
  formSchema: ZTransactions,
  fieldConfig: FTransactions,
}

// cpf: s.string().refine(value => /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(value), {
//   message: 'CPF inválido',
// }),

// oi: z
//   .object({
//     password: z.string(),
//     confirm: z.string(),
//   })
//   .refine(data => data.password === data.confirm, {
//     message: "Passwords don't match",
//     path: ['confirm'], // path of error
//   }),

// habits: z.object({
//   fui: z
//     .string()
//     .min(1, { message: 'This field has to be filled.' })
//     .email('This is not a valid email.'),
//   assisti: z
//     .boolean()
//     .describe('Accept terms and conditions.')
//     .refine(value => value, {
//       message: 'You must accept the terms and conditions.',
//       path: ['acceptTerms'],
//     }),
//   joguei: z
//     .boolean()
//     .describe('Accept terms and conditions.')
//     .refine(value => value, {
//       message: 'You must accept the terms and conditions.',
//       path: ['acceptTerms'],
//     }),
// }),

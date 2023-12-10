// import { s } from '@/lib/utils'
'use client'

import { s } from '@/lib/utils'

export const ZUser = s.object({
  name: s
    .string({
      required_error: 'Username is required.',
    })
    .min(2, {
      message: 'Username must be at least 2 characters.',
    }),

  email: s
    .string()
    .min(1, { message: 'This field has to be filled.' })
    .email('This is not a valid email.'),
})

export const FUser = {
  name: {
    description: 'Bota teu nome ai namoral.',
  },
}

export const propsSchemaFormUser = {
  formSchema: ZUser,
  fieldConfig: FUser,
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

import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','name','email']);

export const CategoryScalarFieldEnumSchema = z.enum(['id','name','color','userId']);

export const TransactionScalarFieldEnumSchema = z.enum(['id','name','description','amount','categoryId','isIncome','dateCreated','dateUpdated']);

export const TestScalarFieldEnumSchema = z.enum(['id','name','email']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullsOrderSchema = z.enum(['first','last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.number().int(),
  name: z.string().nullable(),
  email: z.string().nullable(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// CATEGORY SCHEMA
/////////////////////////////////////////

export const CategorySchema = z.object({
  id: z.number().int(),
  name: z.string().nullable(),
  color: z.string(),
  userId: z.number().int(),
})

export type Category = z.infer<typeof CategorySchema>

/////////////////////////////////////////
// TRANSACTION SCHEMA
/////////////////////////////////////////

export const TransactionSchema = z.object({
  id: z.number().int(),
  name: z.string().nullable(),
  description: z.string().nullable(),
  amount: z.number().min(1, {message: 'Amount must be greater than 1'}),
  categoryId: z.number().int().nullable(),
  isIncome: z.boolean(),
  dateCreated: z.coerce.date(),
  dateUpdated: z.coerce.date(),
})

export type Transaction = z.infer<typeof TransactionSchema>

/////////////////////////////////////////
// TEST SCHEMA
/////////////////////////////////////////

export const TestSchema = z.object({
  id: z.number().int(),
  name: z.string().nullable(),
  email: z.string().nullable(),
})

export type Test = z.infer<typeof TestSchema>

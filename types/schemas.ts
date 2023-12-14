'use client'

import { zSchemasForm } from '@/prisma/generated/zod'
import { Prisma } from '@prisma/client'

const modelNames = Object.keys(Prisma.ModelName) as Prisma.ModelName[]

// export const modelsWithSchema = Object.fromEntries(
//   modelNames.map(modelName => [
//     modelName,
//     schemas[`${model}Schema`].omit({ id: true }),
//   ])
// )

const propsSchemaFormModels = Object.fromEntries(
  modelNames.map(modelName => [
    modelName,
    {
      formSchema: zSchemasForm[modelName],
      fieldConfig: {},
    },
  ])
)
// const propsSchemaFormModels = Object.fromEntries(
//   modelNames.map(modelName => [
//     modelName,
//     {
//       formSchema: schemas[`${modelName}Schema`].omit({
//         id: true,
//         dateUpdated: true,
//       }),
//       fieldConfig: {},
//     },
//   ])
// )

console.log(propsSchemaFormModels)

export default propsSchemaFormModels

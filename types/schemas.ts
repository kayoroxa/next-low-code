'use client'

import { Prisma } from '@prisma/client'
import * as schemas from '../prisma/generated/zod/index'

const model = 'User'

const modelNames = Object.keys(Prisma.ModelName)

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
      formSchema: schemas[`${model}Schema`].omit({ id: true }),
      fieldConfig: {},
    },
  ])
)

export default propsSchemaFormModels

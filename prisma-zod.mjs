import { generatorHandler } from '@prisma/generator-helper'
import fs from 'fs'
// export const s = {
//   string: z.string,
//   number: z.coerce.number,
//   date: z.coerce.date,
//   boolean: z.boolean,
//   select: z.enum,
//   object: z.object,
// }

const typesReplaces = {
  String: 'z.string()',
  Int: 'z.coerce.number()',
  Float: 'z.coerce.number()',
  DateTime: 'z.coerce.date()',
  Boolean: 'z.boolean()',
}

function filterFields(field) {
  return (
    !field.name.match(/(id|dateUpdated)/gi) &&
    !field.relationName &&
    !field.isReadOnly &&
    typesReplaces[field.type]
  )
}

function fieldLine(field) {
  const fill = field?.documentation?.replace(
    /@zod\.?(number|string|date|boolean)?/i,
    ''
  )

  const rest = fill || ''
  const type = typesReplaces[field.type]

  const required = field.isRequired ? '' : '.nullable().optional()'

  return `  ${field.name}: ${type}${rest}${required}`
  //z.coerce.number().nullable().optional().default(0)
}

generatorHandler({
  onManifest: () => ({
    defaultOutput: './prisma',
    prettyName: 'Prisma Client',
    // version,
  }),
  onGenerate: async options => {
    const models = options.dmmf.datamodel.models

    const modelsDictString = models.map(({ name, fields }) => {
      const fieldsWithLines = fields.filter(filterFields).map(fieldLine)

      const ZodObjectString = `z.object({\n${fieldsWithLines.join(',\n')}\n})`

      return [name, ZodObjectString]
    })

    const AllModelConstString = modelsDictString.map(
      ([modelName, ZodObjectString]) => {
        return `const Z${modelName} = ${ZodObjectString}`
      }
    )

    const ExportAllModels = `export const zSchemasForm = {
      ${models.map(({ name }) => `${name}: Z${name}`).join(', ')}
    }`

    const fileJsString = `
    import { z } from 'zod'
    
    ${AllModelConstString.join('\n\n').trim()}
    
    ${ExportAllModels.trim()}
    `.trim() //.replace(/\s{3,}/g, '\s\s')

    //check if folder exists
    if (!fs.existsSync('./prisma/generated/zod')) {
      fs.mkdirSync('./prisma/generated/zod')
    }

    fs.writeFileSync('./prisma/generated/zod/index.ts', fileJsString)
  },
})

'use client'

import { Prisma } from '@prisma/client'
import { useEffect, useState } from 'react'
import { z } from 'zod'
import AutoForm, { AutoFormSubmit } from './ui/auto-form'
import { FieldConfig } from './ui/auto-form/types'
import { ZodObjectOrWrapped } from './ui/auto-form/utils'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'

export type OnEdit = (
  type: Prisma.ModelName,
  newPayload: any,
  id: number | string
) => void

export type OnCreate = (type: Prisma.ModelName, values: any) => void

type FormModalProps = {
  propsSchema: {
    formSchema: ZodObjectOrWrapped
    fieldConfig: FieldConfig<any> | undefined
  }
  children: React.ReactNode
} & (
  | {
      onSubmit: OnEdit
      method: 'update'
      id: number | string
    }
  | {
      onSubmit: OnCreate
      method: 'create'
    }
)

async function fetchData(type: Prisma.ModelName, id: number | string) {
  const response = await fetch(
    `http://localhost:3000/api/${type.toLowerCase()}s/${id}`,
    {
      cache: 'no-store',
    }
  )

  return await response.json()
}

function isEmptyObject(obj: any) {
  return Object.keys(obj).length === 0
}

export default function FormModal(p: FormModalProps) {
  const { onSubmit, children, propsSchema, method } = p
  const id = method === 'update' ? p.id : undefined

  const [open, setOpen] = useState(false)

  const [values, setValues] = useState<z.infer<typeof propsSchema.formSchema>>(
    {}
  )

  useEffect(() => {
    if (method === 'create') {
      setValues({})
    }
    if (method === 'update' && id) {
      ;(async () => {
        const data = await fetchData('User', id)
        setValues(data)
      })()
    }
  }, [method, id, open])

  if (!propsSchema) return null
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        {children}
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        {method === 'update' && isEmptyObject(values) ? (
          <div>Carregando...</div>
        ) : (
          <AutoForm
            onSubmit={props => {
              if (method === 'create') {
                onSubmit('User', props)
              } else if (method === 'update' && id) {
                onSubmit('User', props, id)
              }
              setTimeout(async () => {
                setOpen(false)
              }, 200)
            }}
            values={values}
            onParsedValuesChange={setValues}
            formSchema={propsSchema.formSchema}
            fieldConfig={propsSchema.fieldConfig}
          >
            <AutoFormSubmit>Submit</AutoFormSubmit>

            {/*
    All children passed to the form will be rendered below the form.
    */}
            <p className="text-gray-500 text-sm">
              By submitting this form, you agree to our
              <a href="#" className="text-primary underline">
                terms and conditions
              </a>
              .
            </p>
          </AutoForm>
        )}
      </DialogContent>
    </Dialog>
  )
}

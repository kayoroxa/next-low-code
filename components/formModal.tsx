'use client'
import { useState } from 'react'

import AutoForm, { AutoFormSubmit } from './ui/auto-form'
import { FieldConfig } from './ui/auto-form/types'
import { ZodObjectOrWrapped } from './ui/auto-form/utils'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'

interface FormModalProps {
  propsSchema: {
    formSchema: ZodObjectOrWrapped
    fieldConfig: FieldConfig<any> | undefined
  }
  onSubmit: (values: any) => void
  children: React.ReactNode
}

export default function FormModal({
  onSubmit,
  children,
  propsSchema,
}: FormModalProps) {
  const [open, setOpen] = useState(false)
  if (!propsSchema) return null
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        {children}
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <AutoForm
          onSubmit={props => {
            console.log(JSON.stringify(props, null, 2))
            setOpen(false)
            setTimeout(() => {
              onSubmit(props)
            }, 100)
          }}
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
      </DialogContent>
    </Dialog>
  )
}

'use client'

import { serverDelete, serverEdit } from '@/app/actions'
import MyFormModal from '@/components/formModal'
import { cn } from '@/lib/utils'
import { Prisma } from '@prisma/client'
import { Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { FieldConfig } from './ui/auto-form/types'
import { ZodObjectOrWrapped } from './ui/auto-form/utils'

type OnDelete = (type: Prisma.ModelName, id: number | string) => void

interface Props {
  children: React.ReactNode
  id: number | string
  model: Prisma.ModelName
  propsSchema: {
    formSchema: ZodObjectOrWrapped
    fieldConfig: FieldConfig<any> | undefined
  }
  className?: string
}

export default function CardContainer({
  className,
  children,
  id,
  model,
  propsSchema,
}: Props) {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div
      className={cn(
        'flex flex-col relative bg-slate-200 rounded-lg px-4 py-2 w-[200px] group overflow-hidden',
        className
      )}
    >
      <header className="absolute top-0 right-0 opacity-0 group-hover:opacity-80 flex gap-3 items-center justify-end p-2 bg-slate-200">
        <Trash2
          className="cursor-pointer"
          size={20}
          onClick={() => {
            serverDelete(model, id)
          }}
        />
        <MyFormModal
          propsSchema={propsSchema}
          onSubmit={serverEdit}
          id={id}
          method="update"
          model={model}
        >
          <Pencil className="cursor-pointer" size={20} />
        </MyFormModal>
      </header>
      {children}
    </div>
  )
}

'use client'

import MyFormModal, { OnEdit } from '@/components/formModal'
import { propsSchemaFormUser } from '@/types/Zuser'
import { Prisma } from '@prisma/client'
import { Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'

type OnDelete = (type: Prisma.ModelName, id: number | string) => void

interface Props {
  children: React.ReactNode
  onDelete: OnDelete
  onEdit: OnEdit
  id: number | string
  data: unknown
}

export default function CardContainer({
  children,
  onDelete,
  onEdit,
  id,
  data,
}: Props) {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="flex flex-col relative bg-slate-200 rounded-lg px-4 py-2 w-[200px] group overflow-hidden">
      <header className="absolute top-0 right-0 opacity-0 group-hover:opacity-80 flex gap-3 items-center justify-end p-2 bg-slate-200">
        <Trash2
          className="cursor-pointer"
          size={20}
          onClick={() => {
            onDelete('User', id)
          }}
        />
        <MyFormModal
          propsSchema={propsSchemaFormUser}
          onSubmit={onEdit}
          id={id}
          method="update"
        >
          <Pencil className="cursor-pointer" size={20} />
        </MyFormModal>
      </header>
      {children}
    </div>
  )
}

import MyFormModal from '@/components/formModal'
import { Pencil, Trash2 } from 'lucide-react'

export default function CardContainer({ children }: any) {
  return (
    <div className="flex flex-col relative bg-slate-200 rounded-lg px-4 py-2 w-[200px] group overflow-hidden">
      <header className="absolute top-0 right-0 opacity-0 group-hover:opacity-80 flex gap-3 items-center justify-end p-2 bg-slate-200">
        <Trash2 className="cursor-pointer" size={20} />
        <MyFormModal>
          <Pencil className="cursor-pointer" size={20} />
        </MyFormModal>
      </header>
      {children}
    </div>
  )
}

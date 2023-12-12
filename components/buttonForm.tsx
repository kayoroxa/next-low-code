import { serverAdd } from '@/app/actions'
import MyFormModal from '@/components/formModal'
import { Button } from '@/components/ui/button'
import { Prisma } from '@prisma/client'
import { FieldConfig } from './ui/auto-form/types'
import { ZodObjectOrWrapped } from './ui/auto-form/utils'

interface Props {
  children: React.ReactNode
  model: Prisma.ModelName
  propsSchema: {
    formSchema: ZodObjectOrWrapped
    fieldConfig: FieldConfig<any> | undefined
  }
}

export default function ButtonFormCreate({
  children,
  model,
  propsSchema,
}: Props) {
  return (
    <MyFormModal
      onSubmit={serverAdd}
      propsSchema={propsSchema}
      method="create"
      model={model}
    >
      <Button type="button">{children}</Button>
    </MyFormModal>
  )
}

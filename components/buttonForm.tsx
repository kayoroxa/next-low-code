import { serverAdd } from '@/app/actions'
import MyFormModal from '@/components/formModal'
import { Button } from '@/components/ui/button'
import { Prisma } from '@prisma/client'

interface Props {
  children: React.ReactNode
  model: Prisma.ModelName
  // propsSchema: {
  //   formSchema: ZodObjectOrWrapped
  //   fieldConfig: FieldConfig<any> | undefined
  // }
}

export default function ButtonFormCreate({ children, model }: Props) {
  return (
    <MyFormModal onSubmit={serverAdd} method="create" model={model}>
      <Button type="button">{children}</Button>
    </MyFormModal>
  )
}

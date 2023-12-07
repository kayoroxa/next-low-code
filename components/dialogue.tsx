import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export function DialogCloseButton({
  children,
}: {
  children?: React.ReactNode
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Share</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
            <Button type="submit">Confirm</Button>
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">{children}</div>
      </DialogContent>
    </Dialog>
  )
}

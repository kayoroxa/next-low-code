interface _String {
  required_error?: string
  describe?: string
  min: {
    value: number
    message: string
  }
}

import * as z from 'zod'

function string({ required_error = 'is required', describe, min }: _String) {
  let myString = z.string({
    required_error: 'Password is required.',
  })

  if (describe) {
    myString = myString.describe(describe)
    // Use the "describe" method to set the label
    // If no label is set, the field name will be used
    // and un-camel-cased
  }
  if (min) {
    myString = myString.min(min.value, {
      message: min.message,
    })
  }
  return myString
}

function data({ optional }: { optional?: boolean }) {
  let myData = z.coerce.date()

  if (optional) {
    let n = myData.optional()
    return n
  }

  return myData
}

interface Props {
  [key: string]: z.ZodString
}

export function easyZod(obj: Props) {
  return z.object(obj)
}

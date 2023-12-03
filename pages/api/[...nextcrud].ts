import prismadb from '@/lib/prismadb'
import NextCrud, { PrismaAdapter } from '@premieroctet/next-crud'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const nextCrudHandler = await NextCrud({
    adapter: new PrismaAdapter({
      prismaClient: prismadb,
    }),
  })

  return nextCrudHandler(req, res)
}

export default handler

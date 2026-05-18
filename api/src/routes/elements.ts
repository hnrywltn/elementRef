import { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

router.get('/', async (_req: Request, res: Response) => {
  try {
    const elements = await prisma.element.findMany({ orderBy: { id: 'asc' } })
    res.json(elements)
  } catch {
    res.status(500).json({ error: 'Database error' })
  }
})

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const element = await prisma.element.findUnique({
      where: { id: parseInt(req.params.id) },
    })
    if (!element) { res.status(404).json({ error: 'Not found' }); return }
    res.json(element)
  } catch {
    res.status(500).json({ error: 'Database error' })
  }
})

router.patch('/:id', async (req: Request, res: Response) => {
  try {
    // Strip immutable fields before updating
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, atomicNumber, createdAt, updatedAt, ...updateData } = req.body
    const element = await prisma.element.update({
      where: { id: parseInt(req.params.id) },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: updateData as any,
    })
    res.json(element)
  } catch {
    res.status(500).json({ error: 'Update failed' })
  }
})

export default router

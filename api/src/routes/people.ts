import { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

const includeRelations = {
  elementRelations: {
    include: { element: { select: { id: true, name: true, symbol: true, category: true, cardClass: true } } },
    orderBy: { element: { id: 'asc' } } as const,
  },
}

router.get('/', async (_req: Request, res: Response) => {
  try {
    const people = await prisma.person.findMany({ include: includeRelations, orderBy: { id: 'asc' } })
    res.json(people)
  } catch {
    res.status(500).json({ error: 'Database error' })
  }
})

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const person = await prisma.person.findUnique({
      where: { id: parseInt(req.params.id) },
      include: includeRelations,
    })
    if (!person) { res.status(404).json({ error: 'Not found' }); return }
    res.json(person)
  } catch {
    res.status(500).json({ error: 'Database error' })
  }
})

router.patch('/:id', async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, createdAt, updatedAt, elementRelations, ...updateData } = req.body
    const person = await prisma.person.update({
      where: { id: parseInt(req.params.id) },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: updateData as any,
      include: includeRelations,
    })
    res.json(person)
  } catch {
    res.status(500).json({ error: 'Update failed' })
  }
})

export default router

import { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

// GET /api/characters — all elements with their character references
router.get('/', async (_req: Request, res: Response) => {
  try {
    const elements = await prisma.element.findMany({
      select: {
        id: true, name: true, symbol: true, category: true, cardClass: true,
        characterReferences: { orderBy: { createdAt: 'asc' } },
      },
      orderBy: { id: 'asc' },
    })
    res.json(elements)
  } catch {
    res.status(500).json({ error: 'Database error' })
  }
})

// POST /api/characters/:elementId — add a reference to an element
router.post('/:elementId', async (req: Request, res: Response) => {
  try {
    const { characterName, showOrMovie, actorName, notes, addedBy } = req.body
    if (!characterName) { res.status(400).json({ error: 'characterName is required' }); return }
    const ref = await prisma.characterReference.create({
      data: { elementId: parseInt(req.params.elementId), characterName, showOrMovie, actorName, notes, addedBy },
    })
    res.json(ref)
  } catch {
    res.status(500).json({ error: 'Failed to create reference' })
  }
})

// PATCH /api/characters/ref/:id — update a reference
router.patch('/ref/:id', async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, elementId, createdAt, updatedAt, ...data } = req.body
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ref = await prisma.characterReference.update({ where: { id: parseInt(req.params.id) }, data: data as any })
    res.json(ref)
  } catch {
    res.status(500).json({ error: 'Failed to update reference' })
  }
})

// DELETE /api/characters/ref/:id — remove a reference
router.delete('/ref/:id', async (req: Request, res: Response) => {
  try {
    await prisma.characterReference.delete({ where: { id: parseInt(req.params.id) } })
    res.json({ ok: true })
  } catch {
    res.status(500).json({ error: 'Failed to delete reference' })
  }
})

export default router

import express from 'express'
import cors from 'cors'
import path from 'path'
import elementsRouter from './routes/elements'
import peopleRouter from './routes/people'
import charactersRouter from './routes/characters'

const app = express()
const PORT = parseInt(process.env.PORT || '3001', 10)

app.use(cors())
app.use(express.json())
app.use('/api/elements', elementsRouter)
app.use('/api/people', peopleRouter)
app.use('/api/characters', charactersRouter)

const adminBuildPath = path.join(__dirname, '../../admin/dist')
app.use(express.static(adminBuildPath))
app.get('*', (_req, res) => {
  res.sendFile(path.join(adminBuildPath, 'index.html'))
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`API running on port ${PORT}`)
})

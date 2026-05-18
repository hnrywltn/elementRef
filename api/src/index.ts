import express from 'express'
import cors from 'cors'
import elementsRouter from './routes/elements'

const app = express()
const PORT = 3001

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())
app.use('/api/elements', elementsRouter)

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`)
})

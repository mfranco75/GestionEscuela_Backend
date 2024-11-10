import 'dotenv/config';
import express from 'express';
import userRouter from './routes/user.route.js'
import horariosRouter from './routes/horarios.route.js'

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended:true }))

app.use('/api/v1/users', userRouter)
app.use('/api/v1/horarios', horariosRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('Servidor andando en ' + PORT));




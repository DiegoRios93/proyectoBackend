import express from 'express'
import morgan from 'morgan'
import productosRoutes from './router/productos' 
import carritoRoutes from './router/carrito' 


const app =  express()

app.use(express.json())
app.use(morgan('dev'))

app.use('/productos', productosRoutes)
app.use('/carrito', carritoRoutes)

//iniciar servidor
const PORT = 8080
app.listen(PORT,()=>{
    console.log(`Server on port ${PORT}`)
})
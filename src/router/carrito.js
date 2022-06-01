import { Router } from "express";
import Api from "../apiClass";
const router = Router()
const api = new Api("./src/dataBase/carrito.json")
const prod = new Api("./src/dataBase/productos.json")

//Obtener carritos
router.get('/', async(req,res)=>{
    const carritos = await api.findAll()
    res.json(carritos)
})

//obtener carritos por id
router.get('/:id', async(req,res)=>{
    const {id} = req.params
    const producto = await api.findById(id)
    res.json(producto)
})

//listar productos de un carrito

router.get('/:id/productos', async(req,res)=>{
    const {id} = req.params
    const producto = await api.findById(id)
    res.json(producto)
})

//Crear carritos
router.post('/', async(req,res)=>{
    const producto = await api.create()
    res.json(producto)
})

//agregar productos al carrito
router.post('/:id/:idProd', async(req,res)=>{
    let {id} = req.params
    let {idProd} = req.params
    id= parseInt(id)
    idProd= parseInt(idProd)
    const carrito = await api.findById(id)
    const producto = await prod.findById(idProd)
    console.log(carrito)
    console.log(producto)
    if(producto){
        await carrito.products.push(producto)
        res.json(carrito)
    }else{
        res.send("El producto que quiere agregar no existe")
    }
    
})


//Eliminar carrito por id
router.delete('/:id', async(req,res)=>{
    let {id} = req.params
    id= parseInt(id)
    const productoEliminado = await api.deleteById(id)
    res.json(productoEliminado)
})

export default router


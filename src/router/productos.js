import { Router } from "express";
import Api from "../apiClass";
const router = Router()
const api = new Api("./src/dataBase/productos.json")

const isAdmin = true
//middleware
function adminOrClient(req, res, next){
    if(!isAdmin){
        res.send("No tienes acceso a esta ruta")
    }else{
        next()
    }
}

//rutas con peticiones

router.get('/', async(req,res)=>{
    const productos = await api.findAll()
    res.json(productos)
})

router.get('/:id', async(req,res)=>{
    const {id} = req.params
    const producto = await api.findById(id)
    res.json(producto)
})

router.post('/',adminOrClient, async(req,res)=>{
    const obj = req.body
    const producto = await api.create(obj)
    res.json(producto)
})

router.put('/:id', adminOrClient, async(req,res)=>{
    const {id} = req.params;
    const {title, price, thumbnail} = req.body;
    const producto = await api.modifyProduct(id, title, price, thumbnail)
    res.json(producto)
})

router.delete('/:id', async(req,res)=>{
    let {id} = req.params
    id= parseInt(id)
    const productoEliminado = await api.deleteById(id)
    res.json(productoEliminado)
})

export default router

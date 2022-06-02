import { Router } from "express";
import Api from "../apiClass";
const router = Router()
const api = new Api("src/dataBase/carrito.json")
const prod = new Api("src/dataBase/productos.json")

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
    const producto = await api.createCart()
    res.json(producto)
})

//agregar productos al carrito
// router.post('/:id/:idProd', async(req,res)=>{
//     let {id,idProd} = req.params
//     id= parseInt(id)
//     idProd= parseInt(idProd)
//     let carritos = await api.findAll()
//     let carrito = await api.findById(id)
//     let producto = await prod.findById(idProd)
//     //console.log(carrito)
//     //console.log(producto)
//     if(producto){
//         carrito.products.push(producto)
//         carritos.push(carrito)
//         console.log(carritos)
//         console.log(carrito)
//         res.json(carrito)
//     }else{
//         res.send("El producto que quiere agregar no existe")
//     }
// })

//REVISAR
router.post('/:id/:idProd', async(req,res)=>{
    let {id,idProd} = req.params
    id= parseInt(id)
    idProd= parseInt(idProd)
    let carritos = await api.findAll()
    const arrayIndexPorId = [] // aqui me guardo para cada elemento su id y el indice que tiene en el array
    carritos.forEach((element, index) => {
        arrayIndexPorId.push({elemId: element.id, elemIndex:index})
    }); // uso esto para guardar id e indice en array
    const carritoASuplirIdIndex = arrayIndexPorId.find(carrito => carrito.elemId === parseInt(id)); // busco el objeto que tiene el id del objeto a borrar y el indice del objeto en el array productos
    
    if (carritoASuplirIdIndex){
        const carrito = await api.findById(id);
        const productos = await prod.findAll();
        const productoBuscado = productos.find(producto => producto.id === idProd)
        if(productoBuscado){
            const producto = await prod.findById(idProd)
            carrito.products.push(producto);
            const indexElemSuplir = carritoASuplirIdIndex.elemIndex; // obtengo el indice en el array carritos del objeto a borrar (objeto cuyo id es el que se corresponde con el que quiero borrar)
            carritos.splice(indexElemSuplir, 1, carrito)
            await api.saveProd(carritos);
            res.json ({mensaje: `producto con id ${idProd} agregado al carrito`})
        } else{
            res.json({mensaje: 'no existe el producto que busca incluir'})
        }
    }else{
        res.send("no existe el carrito que busca modificar")
    }
})
//REVISAR

//Eliminar carrito por id
router.delete('/:id', async(req,res)=>{
    let {id} = req.params
    id= parseInt(id)
    const productoEliminado = await api.deleteById(id)
    res.json(productoEliminado)
})

export default router


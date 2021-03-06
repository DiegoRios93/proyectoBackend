import knex from "knex";

export default class Api{
    constructor(options,table){
        this.knex = knex(options)
        this.table = table
    }

    async findAll(){
        try {
            const todos = await this.knex.from(this.table).select("*")
            return todos
        } catch (error) {
            console.log(`Error : ${error}`)
        }
    }

    async findById(id){
        try {
            const elemento = await this.knex.from(this.table).select("*").where('id', id)
            return elemento
        } catch (error) {
            console.log(`Error : ${error}`)
        }
    }

    async create(obj){
        try {
            const nuevoElemento = await this.knex(this.table).insert(obj)
            return nuevoElemento
        } catch (error) {
            console.log(`Error : ${error}`)
        }
    }

    // async modifyProduct(id, newTitle, newPrice, newThumbnail){
    //     try {
    //         const todos = await this.findAll()
    //         let resultado = todos.find(e=>e.id==id)
    //         if(resultado){
    //             resultado.title = newTitle;
    //             resultado.price = newPrice;
    //             resultado.thumbnail = newThumbnail;
    //             await fs.promises.writeFile(this.rutaBD, JSON.stringify(todos))
    //             return resultado
    //         }else{
    //             console.log("No se puede modificar el producto, porque no fue encontrado")
    //         }
    //     } catch (error) {
    //         console.log(`Error : ${error}`)
    //     }
    // }

    async deleteById(id){
        try {
            const elBorrado = await this.knex.from(this.table).where("id",id).delete
            return elBorrado
        } catch (error) {
            console.log(error);
        }
    }

    async deleteAll(){
        try {
            const eliminarTodo = await this.knex.from(this.table).del()
            return eliminarTodo
        } catch (error) {
            console.log(error)
        }
    }
}







// import fs from 'fs'

// export default class Api{
//     constructor(rutaBD){
//         this.rutaBD = rutaBD;
//     }

//     async findAll(){
//         try {
//             const todos = await fs.promises.readFile(this.rutaBD, 'utf-8')
//             return JSON.parse(todos)
//         } catch (error) {
//             console.log(`Error : ${error}`)
//         }
//     }

//     async findById(id){
//         try {
//             const todos = await this.findAll()
//             const resultado = todos.find(e=>e.id==id)
//             return resultado
//         } catch (error) {
//             console.log(`Error : ${error}`)
//         }
//     }

//     async create(obj){
//         try {
//             const todos = await this.findAll()
//             let id
//             todos.length===0
//             ? id=1
//             : id = todos[todos.length-1].id+1

//             todos.push({...obj,id})
//             await fs.promises.writeFile(this.rutaBD, JSON.stringify(todos))
//             return id
//         } catch (error) {
//             console.log(`Error : ${error}`)
//         }
//     }

//     async modifyProduct(id, newTitle, newPrice, newThumbnail){
//         try {
//             const todos = await this.findAll()
//             let resultado = todos.find(e=>e.id==id)
//             if(resultado){
//                 resultado.title = newTitle;
//                 resultado.price = newPrice;
//                 resultado.thumbnail = newThumbnail;
//                 await fs.promises.writeFile(this.rutaBD, JSON.stringify(todos))
//                 return resultado
//             }else{
//                 console.log("No se puede modificar el producto, porque no fue encontrado")
//             }
//         } catch (error) {
//             console.log(`Error : ${error}`)
//         }
//     }

//     async deleteById(id){
//         try {
//             const todos = await this.findAll()
//             let resultado = todos.find(e=>e.id==id)
//             if(resultado){
//                 let newArray = todos.filter(producto=>producto.id !== id);
//                 await fs.promises.writeFile(this.rutaBD, JSON.stringify(newArray))
//                 return newArray
//             }else{
//                 console.log("Producto no encontrado")
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     async deleteAll(){
//         try {
//             const eliminarTodo = [];
//             await fs.promises.writeFile(this.rutaBD, JSON.stringify(eliminarTodo))
//             console.log("Todo eliminado")
//             return ("Todo eliminado")
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     //Crear carrito
//     async createCart(){
//         try {
//             const carritos = await this.findAll()
//             let id
//             carritos.length===0
//             ? id=1
//             : id = carritos[carritos.length-1].id+1
//             let carrito = {
//                 id,
//                 timestamp: new Date(),
//                 products : [] 
//             }
//             carritos.push(carrito)
//             await fs.promises.writeFile(this.rutaBD, JSON.stringify(carritos))
//             return id
//         } catch (error) {
//             console.log(`Error : ${error}`)
//         }
//     }


//     async saveProd(array){
//         try{
//             const contenido = await fs.promises.readFile(this.rutaBD, 'utf-8');
//             let arrayCarritos = JSON.parse(contenido);
//             arrayCarritos = array;
//             await fs.promises.writeFile(this.rutaBD, `${JSON.stringify(arrayCarritos)}`);
//             return arrayCarritos
//         }
//         catch(err){
//             console.log("save error",err)
//         }
//     }
// }
export const options = {
    mariaDB:{
        client: 'mysql',
        connection:{
            host:'127.0.0.1',
            user:'root',
            password:'Knex22',
            database:'PRODUCTOS'
        }
    },
    sqlite:{
        client:'sqlite3',
        connection:{
            filename:"./db.sqlite",
        },
        useNullAsDefault: true
    },
}
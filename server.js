const express = require('express');
const app = express();
const fs = require('fs');

class Contenedor {
    constructor(name){
        this.name = name
    }

    getProducts(){
        const res = fs.readFileSync(this.name, "utf-8");
        return res;
    }

    getRandom(){
        const data = JSON.parse(this.getProducts());
        const random = Math.floor(Math.random() * data.length);
        return data[random];
    }

}

const contenedor1 = new Contenedor("productos.txt")
const prod = contenedor1.getProducts();
const itemRandom = JSON.stringify(contenedor1.getRandom(), null, 2);



app.get('/', (req, res) => {
    res.send(`<h1 style="color:blue;">Hola este es un server con Express!!</h1>`)
})

app.get('/productos', (req, res) => {
    res.send(`Productos: ${prod}`)
})

app.get('/productoRandom', (req, res) => {
    res.send(`Producto elegido al Azar: ${itemRandom}`)
})




const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => {
    console.log('Server is running on port 8080');
})
server.on("error", error => console.log(error));
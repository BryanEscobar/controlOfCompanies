'use strict'

// Variables Globales
const express = require("express")
const app = express();
const bodyParser = require("body-parser")

//Cargar Rutas 

var empresa_routes = require("./routes/empresRoute");
var sucursal_routes = require("./routes/sucursalRoute");


//MidleWares
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())



app.use((req,res,next)=>{
    res.header('Acces-control-Allow-Origin','*');
    res.header('Acces-control-Allow-Headers','Autorization,X-API-KEY,Origin,X-Requested-with,Content-Type,Accept,Access-Control-Allow-Request-Method')
    res.header('Acces-Control-Allow-Methods','GET,POST,OPTIONS,PUT,DELETE')
    res.header('Allow','GET,POST,OPTIONS,PUT,DELETE')

    next();
})  
    
//Rutas localhost:300/api/registrar
app.use('/api',empresa_routes,sucursal_routes)


// Exportar
module.exports = app;
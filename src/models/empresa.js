'use strict'

var moongose = require("mongoose")
var Schema = moongose.Schema;


var SchemaEmpresa = Schema({

    nombre:String,
    telefono:Number,
    email:String,
    password: String,

    
    bodega:[{ //bodega o almacen de la empresa
       nombreProducto:String,
       cantidad:Number
        
    }],

  
    
})
        
module.exports = moongose.model('Empresa',SchemaEmpresa )
   
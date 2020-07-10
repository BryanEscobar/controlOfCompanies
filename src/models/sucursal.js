'use strict'

var moongose = require("mongoose")
var Schema = moongose.Schema;

var SchemaSucursal = Schema({

    nombreSucursal:String ,
    email: String , 

    empresa: {type: Schema.ObjectId ,ref:("Empresa")},


    bodegaSucursal:[{ 
      nombreProductoSucursal:String ,
        cantidad: Number    
    }],

    Empleado:[{

        nombre:String,
        apellidos:String,
        puesto:String,
        departamento:String
    }]
})

module.exports = moongose.model('Sucursal' , SchemaSucursal);
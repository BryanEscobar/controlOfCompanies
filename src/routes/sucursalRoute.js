'use strict'

var express = require("express")
var md_auth = require('../middlewares/authenticated')  
var sucursalesController =require('../controller/sucursalController')



var api = express.Router()

//RUTAS DE SUCURSAL
api.post('/IngresarSucursal',sucursalesController.IngresarSucursal)
api.put('/editarSucursal/:idsucursal',sucursalesController.editarSucursal)
api.delete('eliminarSucursal/:idsucursal',sucursalesController.eliminarSucursal)


// RUTAS SUB DOCUMENTO DE EMPLEADO
api.put('/AgregarEmpleado/:idSucursal',sucursalesController.AgregarEmpleado)
// AQUI SE AGREGA LA RUTA DE SUCURSAL Y DE EMPLEADO
api.put('/ModificarEmpleado/:id/:id',sucursalesController.ModificarEmpleado)
api.put('/EliminarEmpleado/:id',sucursalesController.EliminarEmpleado)

//RUTAS DE BUSQUEDA
api.get('/BusquedaNomProductoSu/:Id',sucursalesController.BusquedaNomProductoSu)
api.get('/listaSucursales',sucursalesController.listaSucursales)



module.exports = api  ;
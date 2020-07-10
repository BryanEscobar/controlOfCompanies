'use strict'

var express = require("express")
var md_auth = require('../middlewares/authenticated')
var empresaController = require("../controller/empresaController")

var api = express.Router()

//RUTAS EMPRESA
api.post('/ImpresaEmpresa',empresaController.IngresarEmpresa)
api.post('/login',empresaController.login)
api.put('/MoficarEmpresa/:idEmpre',empresaController.ModificarEmpresa)
api.delete('/EliminarEmpresa/:IdEmpresa',empresaController.EliminarEmpresa)


// RUTRAS PRODUCTOS
api.put('/productosEmpresa/:idEmpre',empresaController.IngresarProductosEmp)
api.put('/modificarProducto/:idEmpre/:idproducto',empresaController.modificarProducto)
api.delete('/eliminarProducto/:idproducto',empresaController.eliminarProducto)


//api.post('/Stock/:idEmpresa/:idSucursal/:id',EmpresaController.Stock);

//RUTAS DE BUSQUEDA
api.get('/cantidadProductos/:Id',empresaController.cantidadProductos)
api.get('/BuscarNomProducto/:Id',empresaController.BuscarNomProducto)
api.get('/listarEmpresa',empresaController.listarEmpresas)


module.exports = api  ;
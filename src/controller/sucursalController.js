
'use strict'

var Sucursal = require("../models/sucursal") 
var bcrypt =require("bcrypt-nodejs");
var jwt = require("../services/jwt")








function IngresarSucursal(req,res){
    var sucursal = new Sucursal();
    var params =req.body;

    if(params.nombre && params.direccion && params.telefono && params.empresa){
        sucursal.nombre=params.nombre;
        sucursal.direccion=params.direccion;
        sucursal.telefono=params.telefono;
        sucursal.empresa=params.empresa;
       
        sucursal.save((err,sucursalGuardada)=>{
            if(err)return res.status(500).send({message: 'Error en la peticion registrar'})

            if(sucursalGuardada){
                res.status(200).send({Sucursal: sucursalGuardada})


            }else{
                res.status(404).send({message: 'No se a podido registrar la sucursal'})
            }
        })
        
  
        }else{
        res.status(200).send({message: 'Rellene todos los datos'})
    }

}



function editarSucursal(req,res){
    var sucursalId = req.params.idsucursal;
    var params = req.body
   Sucursal.findByIdAndUpdate(sucursalId,params,{new: true},(err , sucursalActualizada)=>{
        if(err)return res.status(500).send({message: 'Error en la peticion'})
        if(!sucursalActualizada)return res.status(404).send({message:'No se ha podido Actualizar el empleado'})
        return res.status(200).send({Sucursal:sucursalActualizada })
    })
    

}


function eliminarSucursal(req,res){
    var sucursalId = req.params.idsucursal

    sucursal.findByIdAndDelete(sucursalId,(err,sucursalEliminada)=>{
        if(err)return res.status(500).send({message:'Error en la  eliminar'})
        if(!sucursalEliminada)return res,status(404).send({message:'No se ha podido Eliminar el empleado'})
        return res.status(200).send({Sucursal:sucursalEliminada})
    })
}




function AgregarEmpleado(req,res) {
    
    var idsucursal = req.params.idSucursal;
    var params = req.body;
     
    Suc.findByIdAndUpdate({_id :idsucursal }, {$push:{Empleado:{nombre:params.nombre,apellidos:params.apellidos,puesto:params.puesto, departamento:nparams.departamento}

    }},{new : true},(err ,EmpleadoAlmacenado)=>{
         if(err) return res.status(500).send({message:'Error en la peticion del agregacion empleado'})
         if(!EmpleadoAlmacenado){ return res.status(404).send({message: 'Error'})
        }else{
            return res.status(200).send({EmpleadoAlmacenado})

        }
    })    
}





function ModificarEmpleado(req ,res) {

    var idsucursal = req.params.id;
    var idempleado = req.params.id;
    var params = req.body; 

    Suc.findOneAndUpdate({_id: idsucursal, "empleado._id":idempleado },{"Empleado.$.nombre": params.nombre,
     "Empleado.$.apellidos": params.apellidos, "Empleado.$.puesto": params.puesto,
     "Empleado.$.departamento": params.departamento},{new:true},(error, Empleadoactualizado)=>{
      console.log(Empleadoactualizado);
        if(error) return res.status(500).send({message: 'Error en la peticion de actualizar'})
         if(!Empleadoactualizado){
         return res.status(404).send({message:'Error en Editar'})
        }else{
            return res.status(200).send({Empleadoactualizado})
        }
    })   
} 




function EliminarEmpleado(req ,res) {

    var idempleado = req.params.id;
    Sucursal.findOneAndUpdate( { "Empleado._id":idempleado},{$pull:{Empleado:{"_id": idempleado}}},{new: true},(error, EmpleadoEliminado)=>{
       if(error) return res.status(500).send({message:'Error de eliminar empleado'})
        if(!EmpleadoEliminado){return res.status(404).send({message: 'Error Eliminar Empleado'})
        }else{
            return res.status(200).send({EmpleadoEliminado})
        }
    })
}





function BusquedaNomProductoSu(req ,res) {
    var idsucursal = req.params.Id;
    var params =  req.body;
    

    Sucursal.find({_id:idsucursal, 'bodegaSucursal.productoSucursal':{$regex:params.nombreProducto, $options:'i'}},{'bodegaSucursal.$':1} ,(err,busqNombre)=>{
        if(err) return res.status(500).send({message:'Error en la peticion'})
        if(!busqNombre) return res.status(404).send({message:'Error en al busqueda'})
         return res.status(200).send({busqNombre})
    })
}


function listaSucursales(req ,res){
    
    Sucursal.find((err, sucursales)=>{
        if(err) return res.status(500).send({message: 'Error en la peticion de Usuario'})
        if(!sucursales) return res.status(404).send({message:'Error en la consulta de usuarios'})
        return res.status(200).send({sucursales})
    })

}



module.exports = {

    IngresarSucursal,
    editarSucursal,
    eliminarSucursal,
    AgregarEmpleado,
    ModificarEmpleado,
    EliminarEmpleado,
    BusquedaNomProductoSu,
    listaSucursales



}


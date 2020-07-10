'use strict'

var Empresa = require("../models/empresa") 
var mongoose = require("mongoose");
var Sucursal = require("../models/sucursal");
var bcrypt =require("bcrypt-nodejs");
var jwt = require("../services/jwt");




function IngresarEmpresa(req, res){

    var empresa = new Empresa();  
    var params = req.body;

    if(params.nombre &&  params.direccion &&  params.telefono && params.email && params.password ){
        empresa.nombre = params.nombre;
        empresa.direccion = params.direccion;
        empresa.telefono = params.telefono;
        empresa.email= params.email;
        empresa.password=params.password;

        Empresa.find({$or:[
            {nombre: empresa.nombre}
        ]}).exec((error,empresas)=>{
            // hago un jason
         

      if(error) return res.status(500).send({message: ' Error en la peticion de loguarse'})
        
        if(empresas && empresas.length >=1 ){
            return res.status(500).send({message: 'la empresa ya existe'})

        }else{
            bcrypt.hash(params.password, null,null, (error, hash) => {
                empresa.password = hash;


                empresa.save((err,empresaGuardada)=>{
                    if(err)return res.status(500).send({message: 'Error en la peticion registrar'})
        
                    if(empresaGuardada){
                        res.status(200).send({empresa: empresaGuardada})
        
        
                    }else{
                        res.status(404).send({message: 'No se a podido registrar el empleado'})
                    }

                
                })
            })
        }
    })

        

       
}else{
    res.status(200).send({
        message: 'Rellene todos los datos necesarios'
    })
}

}





function login(req, res){
    var params = req.body
    
    Empresa.findOne({email: params.email},(error,empresa)=>{
        if(error) return res.status(500).send({message:'Error en la peticion para loguearse '})

        if(empresa){
            bcrypt.compare(params.password,empresa.password,(error,check)=>{
                if(check){
                    if(params.gettoken){
                        return res.status(200).send({ 
                            token: jwt.createToken(empresa)})
                    }else{
                        empresa.password=undefined;
                        return res.status(200).send({empresa})
                    }
                }else{
                    return res.status(404).send({message: 'Error no se ha podido identificar'})
                }
            })
        }else{
            return res.status(404).send({message: ' Lo siento el usuario no se ha podido loguear'})
        }
    })
}





function ModificarEmpresa(req ,res){

    var EmpresaId = req.params.idEmpre;
    var params = req.body


    /*delete params.password

    if(Empresaid != req.empresa.idEmpre){
        return res.status(500).send({message: 'no tiene los permisos para actualizar este usuario'})
    }*/

    Empresa.findByIdAndUpdate(EmpresaId,params,{new: true},(err , empresaActualizado)=>{
        if(err)return res.status(500).send({message: 'Error en la peticion'})
        if(!empresaActualizado)return res.status(404).send({message:'No se ha podido Actualizar la empresa'})
        return res.status(200).send({empresa:empresaActualizado })
    })
    

}




function EliminarEmpresa(req, res) {
    var empresaId = req.params.IdEmpresa;

    Empresa.findByIdAndDelete(empresaId,(err,empresaEliminada)=>{
        if(err) return res.status(500).send({message:'Error en la peticion de la empresa'})
        if(!empresaEliminada){
            return res.status(404).send({message:'Error al eliminar la empresa'})
        }else{
            Sucursal.deleteMany({empresa: mongoose.Types.ObjectId(empresaId)}, (err, eliminados)=>{

                if(err) return res.status(500).send({message:'Error en la peteicion'})
                if(!eliminados){

                    return res.status(404).send({message:'Error al eliminar sucursal'})
                }else{
                    return res.status(200).send({eliminados})           
                }
                })
        }
    })    
}






















function IngresarProductosEmp(req,res){
    var Empresaid = req.params.idEmpre;
    var params= req.body


    Empresa.findByIdAndUpdate(Empresaid,{$push:{mercaderia:{nombreProducto: params.nombreProducto,cantidad: params.cantidad}}},
        {new: true},(error,producto)=>{
    if(error) return res.status(500).send({message: 'Error en la peticion de productos'})
    if(!producto) return res.status(404).send({message: 'error al guardar el producto'})
    return res.status(200).send({producto})

    })
}



function modificarProducto(req,res){
    var Empresaid = req.params.idEmpre;
    var productoid = req.params.idproducto;
    var params = req.body;


    Empresa.findOneAndUpdate({_id:Empresaid,"mercaderia._id":productoid},
        {"mercaderia.$.nombreProducto":params.nombreProducto,
        "mercaderia.$.cantidad":params.cantidad},{new: true},(error, modiProducto)=>{
        if(error) return res.status(500).send({message:'Error en la peticion para editar producto'})
        if(!modiProducto) return res.status(404).send({message:'Error al editar el producto'})
        return res.status(200).send({modiProducto})
    })
}




function eliminarProducto(req,res){
    var productoid = req.params.idproducto;

    Empresa.findByIdAndDelete({"mercaderia._id": productoid},{$pull :mercaderia})
    if(err) return res.status(500).send({message: 'Error en la peticion para eliminar mercaderia'})
    if(!comentarioEliminado) return res.status(404).send({message: 'Error al eliminar mercaderia'})
    return res.status(200).send({comentarioEliminado})   
}







function listarEmpresas(req,res){
    var params=req.body;

    Empresa.find(params,(error,empresasTodas)=>{
        if(error) return res.status(500).send({message:'Error en la lista de empleados'})
        if(!empresasTodas) return res.status(404).send({message:'Error en enlistar los empleados'})
        return res.status(200).send({empresasTodas})
    })
}




function BuscarNomProducto(req ,res) {
    var idEmpresa = req.params.Id;
    var params =  req.body;
    Empresa.find({_id:idEmpresa, 'mercaderia.product_name':{$regex:params.nombreProducto, $options:'i'}},{'mercaderia.$':1} ,(err,nomProduc)=>{
        if(err) return res.status(500).send({message:'Error en la peticion'})
        if(!nomProduc) return res.status(404).send({message:'Error en al busqueda'})
        return res.status(200).send({nomProduc})
    })
}



function cantidadProductos(req,res) {
    var empresaId = req.params.Id;

    Empresa.findById({_id:empresaId},(err,mercaderia)=>{
        if(err) return res.status(500).send({message:'Error en la peticion de los datos'})
        if(!mercaderia) return res.status(404).send({message:'Error en la busqueda de los producots'})
         if(mercaderia.length === 0){ return res.status(500).send({message:'No hay productos en empresa'})
        }
        return res.status(200).send({message:'Hay '+mercaderia.mercaderia.length+' Productos en bodega'})
    })

}


module.exports={
    IngresarEmpresa,
    login,
    ModificarEmpresa,
    EliminarEmpresa,
    IngresarProductosEmp,
    modificarProducto,
    eliminarProducto,
    listarEmpresas,
    BuscarNomProducto,
    cantidadProductos



}

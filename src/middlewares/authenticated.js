'use strict'

var jwt = require("jwt-simple")
var npm  = require("moment")
var secret = 'clave_secreta_2018026'

exports.ensureAuth = function(req , res ,next){

    if(!req.headers.authorization){
        return res.status(403).send({message:'La peticion no tiene la cabecera de autenticacion'}) 
     }


     var token = req.headers.authorization.replace(/['"]+/g,'');

        try{

            var payload = jwt.decode(token ,secret)

            if(payload.exp <= momen().unix()){
                return res.status(401).send({message: 'El token a espirado'})

            }
        }catch (ex){
            return res.status(404).send({message:'El token no es valido'})
        }
        req.empleado = payload;
        
        
        next();
}

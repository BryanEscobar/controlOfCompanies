'use strict'

var jwt = require("jwt-simple")
var moment = require("moment")
var secret = 'clave_secreta_2018026'


exports.createToken = function(Empresa){
    
    var payload ={

        id_sub: Empresa._id,
        nombre: Empresa.name,
        telefono: Empresa.telefono,
        email: Empresa.email,

        iat: moment().unix(),
        exp: moment().day(30,'days').unix()

    } 
    
    return jwt.encode(payload,secret)
}
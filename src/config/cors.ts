import {CorsOptions} from 'cors'

export const corsConfig: CorsOptions = {
    //origin: quien esta tratando de conectarse
    //callback: 
    origin: function(origin, callback) {
        if(origin === 'http://localhost:5173'){
            //null: ningun error
            //true: permitir conexion
            callback(null,true)
        }else{
            callback(new Error('Error de CORS'))
        }
    }
}
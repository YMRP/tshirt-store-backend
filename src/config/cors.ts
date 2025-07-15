import {CorsOptions} from 'cors'

export const corsConfig: CorsOptions = {
    //origin: quien esta tratando de conectarse
    //callback: 
    origin: function(origin, callback) {
        if(origin === process.env.FRONTEND_URL){
            //null: ningun error
            //true: permitir conexion
            callback(null,true)
        }else{
            callback(new Error('Error de CORS'))
        }
    }
}
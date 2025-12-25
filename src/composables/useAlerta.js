import { reactive } from 'vue'

export default function useAlerta(){
    const alerta = reactive({
        msj: '',
        color: ''
    })
    const tipoAlerta = (mensaje) => {
        if (mensaje === 'Coticazando...'){
        alerta.msj = mensaje
        alerta.color = 'green'
        }else if(mensaje === 'Error de conexion...'){
        alerta.msj = mensaje
        alerta.color = 'orange'
        }else if(mensaje === 'Cargando...'){
        alerta.msj = mensaje
        alerta.color = 'green'
        }else if(mensaje === ''){
        alerta.msj = mensaje
        alerta.color = ''
        }else{
        alerta.msj = mensaje
        alerta.color = 'red'  
        }
    }

    return{
        alerta,
        tipoAlerta
    }

}
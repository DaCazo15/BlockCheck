import { ref } from 'vue'

export default function Moneda(){
    
    const cryptoMonedas = ref([])
    const cotizacion = ref({})


    const monedas = ref([
        { codigo: 'USD', texto: 'Dolar de Estados Unidos'},
        { codigo: 'MXN', texto: 'Peso Mexicano'},
        { codigo: 'EUR', texto: 'Euro'},
        { codigo: 'GBP', texto: 'Libra Esterlina'},
    ])

    const listarCrypto = () => {
        const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
        fetch(url)
            .then(respuesta => respuesta.json())
            .then(({Data}) => cryptoMonedas.value = Data)
    }

    const cotizarCrypto = async(crypto, moneda) => {
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto}&tsyms=${moneda}`
        const respuesta = await fetch(url)
        const data = await respuesta.json()
        cotizacion.value = data.DISPLAY[crypto][moneda]
    }


    return{
        monedas,
        cryptoMonedas,
        cotizacion,
        listarCrypto,
        cotizarCrypto
    }
}
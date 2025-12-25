<script setup>
  import { ref, onMounted, reactive,computed } from 'vue';
  import buscar from './assets/buscar.png'
  import cargar from './assets/cargar.png'
  import Alerta from './components/Alerta.vue';
  import Spiner from './components/Spiner.vue';
  import useAlerta from './composables/useAlerta';
  import useMoneda from './composables/useMoneda';

  const cotizando = computed(() => alerta.msj === 'Coticazando...' || alerta.msj === 'Error de conexion...' || alerta.msj === 'Cargando...')
  const peticionExitosa = computed(() => Object.values(cotizacion.value).length > 0)
  const buscarCrypto = ref('')
  const buscarOn = ref(false)
  
  const cotizar = reactive({
    moneda: '',
    crypto: ''
  })
  
  const { alerta, tipoAlerta } = useAlerta()
  const { cryptoMonedas, monedas, cotizacion, listarCrypto, cotizarCrypto} = useMoneda()

  const cargarLista = () => {
    tipoAlerta('Cargando...')
    listarCrypto()
    setTimeout(() => {
      tipoAlerta('')
    }, 1000);
  }
  onMounted(() => {
    cargarLista()
  })
  const busqueda = () => {
    buscarOn.value = !buscarOn.value
    buscarCrypto.value = ''
    cryptoFiltradas.value
  }  
  const obtenerCotizacion = async () => {
    tipoAlerta('Coticazando...')
    try{
      cotizarCrypto(cotizar.crypto, cotizar.moneda)
      setTimeout(() => {
        tipoAlerta('')
      }, 1000);
    }catch(e){
      console.log(e)
      tipoAlerta('Error de conexion...')
    }
  }
  const cotizarMonedas = () => {
    if(Object.values(cotizar).includes('')){
      tipoAlerta('Ambos campos son obligatorios')
      setTimeout(() => {
        tipoAlerta('')
      }, 2000);
      return
    }
    obtenerCotizacion()
    return
  }
  const cryptoFiltradas = computed(() => {
    if (!buscarCrypto.value) return cryptoMonedas.value
    return cryptoMonedas.value.filter(moneda =>
      moneda.CoinInfo.FullName.toLowerCase().includes(buscarCrypto.value.toLowerCase()) ||
      moneda.CoinInfo.Name.toLowerCase().includes(buscarCrypto.value.toLowerCase())
    )
  })

</script>

<template>
  <div class="contenedor">
    <h1 class="titulo">Cotizador de <span>criptomonedas</span></h1>
    <div class="contenido">
      <form class="formulario" @submit.prevent="cotizarMonedas">
        <Alerta 
          v-if="alerta.msj"
          :color="alerta.color"
        >{{ alerta.msj }}</Alerta>
        <div class="contenedor-moneda">
          <label for="crypto">Monedas</label>
          <img 
            @click="cargarLista"
            :src="cargar" 
            alt="cargar">
        </div>
          <select id="moneda" v-model="cotizar.moneda">

            <option value="">-- Selecciona --</option>
            <option v-for="moneda in monedas" :value="moneda.codigo">{{ moneda.texto }}</option>
          </select>


          <div class="contenedor-crypto">
            <label for="crypto">CrytoMonedas</label>
            <img 
              @click="busqueda"
              :src="buscar" 
              alt="Buscar Crypto">
          </div>
          
          <div v-if="buscarOn">
            <input 
            type="text" 
            class="buscador" 
            v-model="buscarCrypto" 
            placeholder="Buscar...">
          </div>

          <select id="crypto" v-model="cotizar.crypto">

            <option value="">-- Selecciona --</option>
            <option v-for="moneda in cryptoFiltradas" :value="moneda.CoinInfo.Name">{{ `${moneda.CoinInfo.FullName} (${moneda.CoinInfo.Name})` }}</option>
          </select>

          <input type="submit" value="Cotizar" class="btn-buscar" :class="alerta.color"/>
        </form>

        <Spiner 
          v-if="cotizando"
          :color="alerta.color"
        ></Spiner>

        
        <div class="contenedor-resultado" v-if="peticionExitosa && !cotizando">
          <h2>Cotización</h2>
          <div class="resultado" >
            <img 
              :src="`https://www.cryptocompare.com/${cotizacion.IMAGEURL}` "
              alt="imagen crypto">
            <div>
              <p>El precio es: <span>{{ cotizacion.PRICE }}</span></p>
              <p>Precio mas alto: <span>{{ cotizacion.HIGHDAY }}</span> del dia</p>
              <p>Precio mas bajo: <span>{{ cotizacion.LOWDAY }}</span> del dia</p>
              <p>Variacion las ultimas 24H: <span>{{ cotizacion.CHANGEPCT24HOUR }}%</span></p>
              <p>Ultima actualización: <span>{{ cotizacion.LASTUPDATE }}</span></p>
            </div>
          </div>
        </div>
    </div>
  </div>
  
</template>

<style scoped>
  .contenedor-moneda{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .contenedor-moneda img {
    width: 3rem;
    cursor: pointer;
  }
  .contenedor-crypto{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .contenedor-crypto img {
    width: 3rem;
    cursor: pointer;
  }
  .buscador {
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    border: none;
    background-color: #e7e7e7;
    border-radius: 2rem;
    padding: 1rem .5rem 1rem 2rem;
    font-size: 1.8rem;
  }
  .buscador:focus {
    outline: none;
  }
  .btn-buscar.red{
    background-color: #8e2424;
  }
  .btn-buscar.orange{
      background-color: #d08700;
  }
</style>

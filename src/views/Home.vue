<template>
  <div class="component-box">
    <search-input
      class="search-cep"
      :value="cep"
      :infoCep="infoCep"
      @updateValue="updateValue"
      @updateInfoCep="updateInfoCep"
      @loadMarkCep="loadMarkCep"
      @setStyle = "setStyle"
    />
    <buscar-mostrar-cep :infoCep="infoCep" :infoStyle="infoStyle"/>
    <mapa :cep="cepSearchMap" />
  </div>
</template>

<script>
// <buscar-mostrar-cep :value="cep" />
import BuscarMostrarCep from "../components/buscar-mostrar-cep/index.vue";
import SearchInput from "../components/search-input/index.vue";
import Mapa from "../components/map-view/index.vue";
export default {
  components: {
    SearchInput,
    BuscarMostrarCep,
    Mapa,
  },
  data() {
    return {
      cep: "",
      cepSearchMap: "",
      infoCep: {},
      infoStyle:{}
    };
  },
  methods: {
    setStyle(newValue){
      this.infoStyle.height = newValue;
    },
    updateValue(newValue) {
      this.cep = newValue;
    },
    updateInfoCep(newValue) {
      this.infoCep = newValue;
    },
    loadMarkCep(cep){
      let query = '';
      if(cep.logradouro){
        query+= cep.logradouro + ', '
      }
      if(cep.bairro){
        query+= cep.bairro + ', '
      }
      if(cep.localidade){
        query+= cep.localidade + ', '
      }
      if(cep.cep){
        query+= cep.cep
      }
      console.log(query)
      this.cepSearchMap = query
    }
  },
};
</script>

<style>
.component-box {
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
}
.search-cep {
  grid-column: 1/-1;
  justify-self: center;
}
.btn-busca {
  background: blueviolet;
  border: 1px solid transparent;
  border-radius: 5px;
  font-size: 1rem;
  padding: 8px 16px;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
}
</style>
<template>
  <div class="component-box">
    <search-ddd-input
      class="search-cep"
      :value="ddd"
      :infoDDD="infoDDD"
      @updateValue="updateValue"
      @updateInfoDDD="updateInfoDDD"
      @loadMarkDDD="loadMarkDDD"
      @setStyle = "setStyle"
    />
    <buscar-mostrar-ddd 
    :infoDdd="infoDDD" 
    :infoStyle="infoStyle"/>
    <mapa :cep="dddSearchMap" />
  </div>
</template>

<script>
//     
import SearchDddInput from "../components/search-ddd-input/index.vue";
import BuscarMostrarDdd from "../components/buscar-mostrar-ddd/index.vue";
import Mapa from "../components/map-view/index.vue";
export default {
  components: {
    SearchDddInput,
    BuscarMostrarDdd,
    Mapa,
  },
  data() {
    return {
      ddd: "",
      dddSearchMap: "",
      infoDDD: {},
      infoStyle:{}
    };
  },
  methods: {
    setStyle(newValue){
      this.infoStyle.height = newValue;
    },
    updateValue(newValue) {
      this.ddd = newValue;
    },
    updateInfoDDD(newValue) {
      this.infoDDD = newValue;
      console.log(this.infoDDD)
    },
    loadMarkDDD(ddd){
      this.dddSearchMap = 'DDD' + ddd 
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
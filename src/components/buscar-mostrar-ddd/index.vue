<template>
  <section  class="info-container" >
    <h2 class="info-title">Informações</h2>
    <ul v-if="infoVazia()" class="info">
      <p>UF do Estado: <strong>{{localinfoDDD.state}}</strong></p>
       <div class="cidades" name="cidades" id="cidades" >
        <span v-for="cidade, index in localinfoDDD.cities" :key="index+cidade" :value="cidade">
          {{cidade}}
        </span>
      </div>
    </ul>
     <ul v-else class="info">
      <li v-for="(valor, index) in infoDefault" :key="valor+index">
        <strong>{{ valor }}</strong>
      </li>
    </ul>
  </section>
 
</template>

<script>
export default {
  props: {
    infoDdd: {
      type: Object,
      required: true,
    },
    infoStyle: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      cidadeSelecionada: "Selecione",
      localInfoStyle: {},
      localinfoDDD: {},
      infoDefault: [
        'Tente pesquisar algo, as informações aparecerão aqui...',
        'Por exemplo: DDD',
        
      ]
    };
  },
  created() {
    this.localinfoDDD = this.infoDDD;
    this.localInfoStyle = this.infoStyle;
  },
  watch: {
    infoDdd(newValue) {
      this.localinfoDDD = newValue;
      console.log(this.localinfoDDD)
    },
    infoStyle(newValue){
      this.localInfoStyle = newValue;
    }
  },
  methods: {
    infoVazia() {
      for (var prop in this.localinfoDDD) {
        if (this.localinfoDDD.hasOwnProperty(prop)) return true;
      }
      return false;
    },
  },
};
</script>

<style scoped>
.info-container {
  height: fit-content;
  display: grid;
  grid-template-columns: auto 1fr;
  background: #f1f1f1;
  padding: 20px 40px;
  border-radius: 10px;
  color: #000;
  font-weight: 500;
}
.info-title {
  grid-column: 1/-1;
  margin: 0px;
}
.info strong {
  color: blueviolet;
}
.info li {
  padding: 5px 20px;
}
.cidades{
  background: #2f2f2f;
  max-height: 400px;
  overflow-y: scroll;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
}
.cidades span{
  display: block;
  color: blueviolet;
  font-size: 0.8rem;
}
</style>
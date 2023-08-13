<template>
  <section  class="info-container" >
    <h2 class="info-title">Informações</h2>
    <ul v-if="infoVazia()" class="info">
      <li v-for="(valor, chave) in localInfoCep" :key="chave">
        {{ chave.toUpperCase() }}: <strong>{{ valor }}</strong>
      </li>
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
    infoCep: {
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
      localInfoStyle: {},
      localInfoCep: {},
      infoDefault: [
        'Tente pesquisar algo, as informações aparecerão aqui...',
        'Por exemplo: 95350000',
        
      ]
    };
  },
  created() {
    this.localInfoCep = this.infoCep;
    this.localInfoStyle = this.infoStyle;
  },
  watch: {
    infoCep(newValue) {
      this.localInfoCep = newValue;
    },
    infoStyle(newValue){
      this.localInfoStyle = newValue;
    }
  },
  methods: {
    infoVazia() {
      for (var prop in this.localInfoCep) {
        if (this.localInfoCep.hasOwnProperty(prop)) return true;
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
</style>
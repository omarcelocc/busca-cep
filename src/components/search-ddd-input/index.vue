<template>
  <section>
    <div class="search">
      <form @submit.prevent="buscarDDD" class="input">
        <input type="text" placeholder="Pesquisar..." v-model="localValue" />
        <span class="input__clear" @click="limparValue()">x</span>
      </form>
      <button class="btn-busca" @click="buscarDDD">Buscar</button>
    </div>
    <ul class="erros">
      <li v-for="e in erros" :key="e">{{ e }}</li>
    </ul>
  </section>
</template> 

<script>
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
    infoDDD: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      erros: [],
      localValue: "",
      localInfoDDD: {},
      buscando: false,
      erroMessage: "",
    };
  },
  created() {
    this.localValue = this.value;
    this.localInfoDDD = this.infoDDD;
  },

  watch: {
    localValue(newValue) {
      this.$emit("updateValue", newValue);
    },
    localInfoDDD(newValue) {
      this.$emit("updateInfoDDD", newValue);
    },
  },
  methods: {
    buscarDDD() {
      if (this.verificarForm()) {
        this.getinfoDDD();
      } else {
      }
    },
    verificarForm() {
      this.erros = [];
      const isNumeric = /^\d+(?:\.\d+)?$/.test(this.localValue);
      if ((this.localValue.length === 2) & isNumeric) {
        return true;
      } else if (this.localValue.length != 2) {
        this.erros.push("O DDD deve conter 2 numeros");
      } else {
        this.erros.push("Digite somente numeros");
      }
      setTimeout(() => {
        this.erros = [];
      }, 10000);
      return false;
    },
    getinfoDDD() {
      if (!this.buscando) {
        this.buscando = true;
        const url = "https://brasilapi.com.br/api/ddd/v1/" + this.localValue;
        try {
          fetch(url)
            .then((r) => r.json())
            .then((value) => {
              if (!value.erro) {
                value.cites = value.cities.reverse();
                this.localInfoDDD = value;
                
                this.$emit("loadMarkDDD", value);
                this.$.emit('setStyle', '450px')
               
              } else {
                this.localInfoDDD = {
                  ddd: "Não encontrado",
                };
              }
            });
          this.buscando = false;
        } catch (e) {
          this.localInfoDDD = {
            ddd: "Não encontrado",
          };
        }
      }
    },
    clearValue() {
      this.$emit("input", "");
    },
    limparValue() {
      this.localValue = "";
    },
  },
};
</script>

<style scoped>
section {
  margin: 40px 10px;
}
.search {
  display: flex;
  align-items: center;
}
.input {
  min-width: 400px;
  display: flex;
  position: relative;
  margin-right: 10px;
}
.input input {
  width: 100%;
  padding: 8px 22px 8px 10px;
  font-size: 1rem;
  border: 2px solid #e3e3e3;
  background: #fafafa;
  border-radius: 10px;
  outline: none;
  color: blueviolet;
  font-weight: bold;
}

.input input:focus {
  border-color: blueviolet;
}

.input .input__clear {
  position: absolute;
  right: 12px;
  top: 4px;
  font-size: 18px;
  color: red;
  font-weight: bold;
}
.input .input__clear {
  cursor: pointer;
}
.erros {
  margin-left: 10px;
}
.erros li {
  color: red;
}
</style>
<template>
  <section>
    <div class="search">
      <form @submit.prevent="buscarCep" class="input">
        <input type="text" placeholder="Pesquisar..." v-model="localValue" />
        <span class="input__clear" @click="limparValue()">x</span>
      </form>
      <button class="btn-busca" @click="buscarCep">Buscar</button>
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
    infoCep: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      erros: [],
      localValue: "",
      localInfoCep: {},
      buscando: false,
      erroMessage: "",
    };
  },
  created() {
    this.localValue = this.value;
    this.localInfoCep = this.infoCep;
  },

  watch: {
    localValue(newValue) {
      this.$emit("updateValue", newValue);
    },
    localInfoCep(newValue) {
      this.$emit("updateInfoCep", newValue);
    },
  },
  methods: {
    buscarCep() {
      if (this.verificarForm()) {
        this.getInfoCep();
      } else {
      }
    },
    verificarForm() {
      this.erros = [];
      const isNumeric = /^\d+(?:\.\d+)?$/.test(this.localValue);
      if ((this.localValue.length === 8) & isNumeric) {
        return true;
      } else if (this.localValue.length != 8) {
        this.erros.push("O cep deve conter 8 numeros");
      } else {
        this.erros.push("Digite somente numeros");
      }
      setTimeout(() => {
        this.erros = [];
      }, 10000);
      return false;
    },
    getInfoCep() {
      if (!this.buscando) {
        this.buscando = true;
        const url = "https://viacep.com.br/ws/" + this.localValue + "/json/";
        try {
          fetch(url)
            .then((r) => r.json())
            .then((value) => {
              if (!value.erro) {
                this.localInfoCep = value;
                this.$emit("loadMarkCep", value);
                this.$.emit('setStyle', '450px')
               
              } else {
                this.localInfoCep = {
                  cep: "Não encontrado",
                };
              }
            });
          this.buscando = false;
        } catch (e) {
          this.localInfoCep = {
            cep: "Não encontrado",
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
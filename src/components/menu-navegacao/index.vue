<template>
  <header>
    <router-link
      @click="verificarRota(rotas[0].path)"
      class="logo"
      :to="rotas[0].path"
    >
      <p >Busca<span>Cep</span></p>
    </router-link>
    <nav>
      <div
        v-for="(rota, index) in rotas"
        :key="index + rota.path"
        class="menu-item"
      >
        <router-link
          @click="verificarRota(rota.path)"
          class="router-link"
          :style="isAtualPage(rota.path) ? styleAtivo : {}"
          :to="rota.path"
          >{{ rota.title }}</router-link
        >
      </div>
    </nav>
    <div class="opcoes-conta">
      <button class="entrar">Entrar</button>
      <button class="cadastrar">Cadastrar</button>
    </div>
  </header>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    return { router };
  },
  data() {
    return {
      styleAtivo: {
        color: "blueviolet",
      },
      rotas: [
        {
          path: "/",
          title: "CEP",
        },
        {
          path: "/ddd",
          title: "DDD",
        },
        {
          path: "/parceiros",
          title: "Parceiros",
        },
        {
          path: "/sobre",
          title: "Sobre",
        },
      ],
      rotaAtual: this.router.currentRoute.value.path,
    };
  },

  methods: {
    verificarRota(rota) {
      this.rotaAtual = rota;
    },
    isAtualPage(page) {
      console.log(page);
      if (page === this.rotaAtual) {
        console.log(true);
        return true;
      }
      console.log(false);
      return false;
    },
  },
};
</script>

<style scoped>
header {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  padding: 30px 60px 30px 60px;
  background: #1f1f1f;
  align-items: center;
  justify-content: space-between;
}
nav {
  padding: 0px 20px;
  display: flex;
  gap: 30px;
  align-items: center;
  place-content: center;
}
.logo {
  align-self: center;
  color: white;
}
.menu-item {
  font-size: 1.2rem;
  padding: 4px 12px;
  border-radius: 10px;
  color: white;
  box-sizing: border-box;
}
.menu-item .router-link {
  color: #fff;
  position: relative;
}
.menu-item .router-link::before {
  content: "";
  bottom: 0px;
  background: white;
  width: 0%;
  height: 1.5px;
  border-radius: 10px;
  position: absolute;
}
.menu-item:hover {
  background: #2f2f2f;
}
.opcoes-conta {
  display: flex;
  gap: 20px;
  justify-self: end;
}
.entrar {
  background: #3f3f3f;
  border: 1px solid transparent;
  border-radius: 5px;
  font-size: 1rem;
  padding: 8px 16px;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
}
.logo {
  font-weight: bold;
  font-size: 2rem;
}
.logo span {
  color: blueviolet;
}
.cadastrar {
  background: #fff;
  border: 1px solid transparent;
  border-radius: 5px;
  font-size: 1rem;
  padding: 8px 16px;
  font-weight: bold;
  color: blueviolet;
  cursor: pointer;
}
.entrar:hover {
  border-color: #fff;
}
.cadastrar:hover {
  border-color: blueviolet;
}
@media (max-width: 1000px) {
  nav {
    gap: 10px;
  }
  header {
    padding: 30px 20px;
  }
}
</style>
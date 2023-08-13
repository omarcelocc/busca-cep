<template>
  <div id="app"></div>
  <menu-navegacao />
  <main>
    
    <router-view />
  </main>
</template>

<script >
import MenuNavegacao from "./components/menu-navegacao/index.vue";

export default {
  name: "App",
  components: {
    MenuNavegacao,
  },
  
};
</script>


<style scoped>
main {
  width: 100%;
  display: grid;
  justify-content: center;
  padding-bottom: 500px;
}

</style>

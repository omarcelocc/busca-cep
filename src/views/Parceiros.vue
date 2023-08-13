<template>
  <section>
    <div class="cabecalho">
      <h2>Parceiros</h2>
      <p>
        Ultilizamos serviços desses parceiros para a criação e manutenção desse
        site:
      </p>
    </div>
    <ul class="lista-parceiros">
      <li v-for="(parceiro, index) in parceiros" :key="index + parceiro">
        <div class="nome-imagem">
          <h3 class="nome-parceiro">{{ parceiro.nome }}</h3>
          <img :src="parceiro.iconePath" alt="" />
        </div>
        <p class="descricao">{{ parceiro.descricao }}</p>
        <a :href="parceiro.link" class="botao" target="_blank">Visitar {{ parceiro.nome }}</a>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  data() {
    return {
      parceiros: [
        {
          nome: "Google Maps",
          descricao:
            "Google Maps é um serviço de pesquisa e visualização de mapas e imagens de satélite da Terra gratuito para navegadores, iOS e Android fornecido e desenvolvido pela empresa estadunidense Google.",
          link: "https://www.google.com.br/maps/preview",
          iconePath: "https://cdn-icons-png.flaticon.com/512/2913/2913974.png",
        },
        {
          nome: "Via Cep",
          descricao:
            "Webservice gratuito para consulta de endereço via CEP, suporta Ajax e retorno nos formatos JSON ou XML.",
          link: "https://viacep.com.br/",
          iconePath:
            "https://viacep.com.br/estatico/images/viacep.png.pagespeed.ce.I80LiA6qpr.png",
        },
        {
          nome: "Google Maps",
          descricao:
            "Google Maps é um serviço de pesquisa e visualização de mapas e imagens de satélite da Terra gratuito para navegadores, iOS e Android fornecido e desenvolvido pela empresa estadunidense Google.",
          link: "https://www.google.com.br/maps/preview",
          iconePath: "https://cdn-icons-png.flaticon.com/512/2913/2913974.png",
        },
        {
          nome: "Google Maps",
          descricao:
            "Google Maps é um serviço de pesquisa e visualização de mapas e imagens de satélite da Terra gratuito para navegadores, iOS e Android fornecido e desenvolvido pela empresa estadunidense Google.",
          link: "https://www.google.com.br/maps/preview",
          iconePath: "https://cdn-icons-png.flaticon.com/512/2913/2913974.png",
        },
        {
          nome: "Google Maps",
          descricao:
            "Google Maps é um serviço de pesquisa e visualização de mapas e imagens de satélite da Terra gratuito para navegadores, iOS e Android fornecido e desenvolvido pela empresa estadunidense Google.",
          link: "https://www.google.com.br/maps/preview",
          iconePath: "https://cdn-icons-png.flaticon.com/512/2913/2913974.png",
        },
        {
          nome: "Google Maps",
          descricao:
            "Google Maps é um serviço de pesquisa e visualização de mapas e imagens de satélite da Terra gratuito para navegadores, iOS e Android fornecido e desenvolvido pela empresa estadunidense Google.",
          link: "https://www.google.com.br/maps/preview",
          iconePath: "https://cdn-icons-png.flaticon.com/512/2913/2913974.png",
        },
      ],
    };
  },
};
</script>

<style scoped>
section {
  margin: 20px 30px;
  display: grid;
  gap: 20px;
  justify-items: start;
}
.cabecalho{
  display: grid;
  margin-bottom: 20px;
}
.cabecalho h2 {
  font-size: 2.5rem;
}
.cabecalho p {
  font-size: 1.2rem;
}
.lista-parceiros {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px 60px;
  flex-wrap: wrap;
}
.lista-parceiros li {
  min-width: 250px;
  max-width: 400px;
  display: grid;
  align-items: start;
  gap: 10px;
  background: #2f2f2f;
  padding: 10px 30px;
  border-radius: 10px;
}
.nome-imagem {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 50px;
}
.nome-imagem img {
  max-width: fit-content;
  height: 30px;
}
.nome-imagem h3 {
  font-size: 1.8rem;
  color: #9f9f9f;
}
.lista-parceiros p{
  align-self: start;
}
.botao{
  justify-self: start;
  align-self: end;
  font-size: 1.2rem;
  color: blueviolet;
  margin-bottom: 10px;
  cursor: pointer;
}
.botao:hover{
  color: white
}
</style>
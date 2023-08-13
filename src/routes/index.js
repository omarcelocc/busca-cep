import {createRouter, createWebHistory} from 'vue-router';
import Cep from '../views/Home.vue';
import Sobre from '../views/SobreNos.vue';
import Parceiros from '../views/Parceiros.vue';
import BuscaDDD from '../views/BuscaDDD.vue';
import NotFound from '../views/NotFound.vue';

const routes = [
  { path: '/', component: Cep },
  { path: '/sobre', component: Sobre },
  { path: '/parceiros', component: Parceiros },
  { path: '/ddd', component: BuscaDDD },
  {path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound}
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router
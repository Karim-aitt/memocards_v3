import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginRegisterView from '../views/LoginRegisterView.vue'
import { userVerification } from '../api/utils/auth'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/signup',
      name: 'signup',
      component: LoginRegisterView
    },
    {
      path: '/cards',
      name: 'cards',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CardsView.vue')
    }
  ]

})


router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('token');
  

  if (!token) {
    if (to.name !== 'signup') {
      next("/signup");
    } else {
      next();
    }
  } else {
    try {
      const verification = await userVerification(token);
      
      if (verification) {
        if (to.name !== 'home') {
          next({ name: "home" });
        } else {
          next();
        }
      } else {
        localStorage.removeItem("token")
        next("/signup");
      }
    } catch (error) {
      console.log(error, "error verification index.js");
      next("/signup");
    }
  }
});

// Este bloque de código se asegura de que si un usuario no está autenticado, 
// se lo redirigirá a la página de registro (/signup). 
// Sin embargo, si ya está en la página de registro, 
// se le permite continuar navegando sin ninguna redirección adicional. 
// Esto ayuda a evitar un bucle infinito de redirecciones 
// en caso de que el usuario ya esté en la página de registro y no esté autenticado.

export default router

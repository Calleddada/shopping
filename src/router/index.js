import Vue from 'vue'

import VueRouter from 'vue-router'
import routes  from './routes'

Vue.use(VueRouter)

import store from '@/store'

let router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
      },
})

router.beforeEach(async(to, from, next) => {
  let token = store.state.user.token;
  let name = store.state.user.userInfo.name;

  // if (token) {
  //   if (to.path === '/login' || to.path === '/register') {
  //     // Only redirect if not already on the home page
  //     if (from.path !== '/') {
  //       next('/');
  //     } else {
  //       next(); // Allow the navigation if already on the home page
  //     }
  //   } else {
  //     if (name) {
  //       next();
  //     } else {
  //       try {
  //         await store.dispatch('getUserInfo');
  //         next(); // Ensure we're not navigating to the same route unnecessarily
  //       } catch (error) {
  //         await store.dispatch('userLogout'); // Corrected dispatch call
  //         next('/login');
  //       }
  //     }
  //   }
  // } else {
  //   next();
  // }
  if(token){
    if (to.path === '/login' || to.path === '/register') {
      next('/')
    }else{
      if(name){
        next()
      }else{
        try {
          await store.dispatch('getUserInfo')
          next()
        } catch (error) {
          store.dispatch('userLogout')
          next('/login')
        }
      }
    }
  }else{
    let toPath = to.path
    if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1){
      next('/login?redirect='+toPath)
    }else{
      next()
    }
  }
});
export default router
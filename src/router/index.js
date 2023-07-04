import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store/index.js";
import DashboardLayout from "../layouts/Default_Dashboard.vue";
import Overview from "../views/Overview.vue";
import Profile from "../views/Profile.vue";
import Master from "../layouts/Master.vue";
import Children from "../layouts/Children.vue";
import PageNotFound from "../views/PageNotFound.vue"


Vue.use(VueRouter);

async function checkAuth(to, from, resolve, reject) {
  await axios.get(`${process.env.VUE_APP_URL}/api/cek_token`, { 
      headers: { Authorization: `Bearer ${store.getters.isTokenUser}` } 
  }).then(response => {
      // Token is valid, so continue
      resolve();
  }).catch(error => {
      // There was an error so redirect
      router.push({ path: "/" });
  })
}

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/password/reset",
    name: "ForgetPassword",
    component: () =>
    import("../views/ForgetPassword.vue"),
  },
  {
    path: "/reset/password/:link",
    name: "ResetPassword",
    component: () =>
      import("../views/ResetPassword.vue"),
  },
  {
    path: "/admin",
    component: DashboardLayout,
    redirect: "/admin/dashboard",
    // beforeEnter: checkAuth,
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: Children,
        redirect: "/admin/dashboard",
        // beforeEnter: checkAuth,
        children: [
          {
            path: '',
            name: 'dashboard',
            component: Overview
          },
        ]
      },
      // {
      //   path: 'datastore',
      //   name: 'datastore',
      //   component: Children,
      //   redirect: "/admin/datastore",
      //   beforeEnter: checkAuth,
      //   children: [
      //     {
      //       path: '',
      //       name: 'datastore',
      //       component: () => import("../views/DataStore/DataStore.vue")
      //     },
      //     {
      //       path: "user-management",
      //       component: Children,
      //       redirect: "/admin/datastore/user-management/overview",
      //       name: 'datastore',
      //       children: [
      //         {
      //           path: 'overview',
      //           name: 'datastore',
      //           component: () => import("../views/DataStore/UserManagement/Overview.vue")
      //         },
      //         {
      //           path: 'entity',
      //           name: 'datastore',
      //           component: () => import("../views/DataStore/UserManagement/Entity.vue")
      //         },
      //         {
      //           path: 'application',
      //           name: 'datastore',
      //           component: () => import("../views/DataStore/UserManagement/Application.vue")
      //         },
      //         {
      //           path: 'group-master',
      //           name: 'datastore',
      //           component: () => import("../views/DataStore/UserManagement/GroupMaster.vue")
      //         },
      //         {
      //           path: 'menu-header',
      //           name: 'datastore',
      //           component: () => import("../views/DataStore/UserManagement/MenuHeader.vue")
      //         },
      //         {
      //           path: 'menu-item',
      //           name: 'datastore',
      //           component: () => import("../views/DataStore/UserManagement/MenuItem.vue")
      //         },
      //         {
      //           path: 'group-right',
      //           name: 'datastore',
      //           component: () => import("../views/DataStore/UserManagement/GroupRight.vue")
      //         },
      //         {
      //           path: 'variable',
      //           name: 'datastore',
      //           component: () => import("../views/DataStore/UserManagement/EnvVariable.vue")
      //         },
      //         {
      //           path: 'configuration',
      //           name: 'datastore',
      //           component: () => import("../views/DataStore/UserManagement/EnvConfiguration.vue")
      //         },
      //         {
      //           path: 'users',
      //           name: 'datastore',
      //           component: () => import("../views/DataStore/UserManagement/Users.vue")
      //         },
      //         {
      //           path: 'user-group',
      //           name: 'datastore',
      //           component: () => import("../views/DataStore/UserManagement/UserGroup.vue")
      //         },
      //         {
      //           path: 'office',
      //           name: 'datastore',
      //           component: () => import("../views/DataStore/UserManagement/BranchOffice.vue")
      //         },
      //       ]
      //     }
      //   ]
      // },
        
    ]
  },
  { path: "*", 
    component: DashboardLayout,
    redirect: "/PageNotFound",
    beforeEnter: checkAuth,
    children: [
      {
        path: 'PageNotFound',
        name: 'PageNotFound',
        component: PageNotFound
      }
    ]
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

let programmatic = false
;(['push', 'replace', 'go', 'back', 'forward']).forEach(methodName => {
  const method = router[methodName]
  router[methodName] = (...args) => {
    programmatic = true
    method.apply(router, args)
  }
})

router.beforeEach((to, from, next) => {
  // name is null for initial load or page reload
  if (from.name === null || programmatic) {
    // triggered bu router.push/go/... call
    // route as usual
    next()
  } else {
    // triggered by user back/forward 
    // do not route
    next(false)
  }
  programmatic = false // clear flag
})

export default router;
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/pubilc/Home.vue"
import highchartsUse from "../views/highchartsUse";
import highchartsMapUse from "../views/highchartsMapUse";
import canvasUse from "../views/canvasUse";
import componentValueTransfer from "../views/componentValueTransfer";

Vue.use(VueRouter);

const routes = [
 {
   path:"/",
   name:"home",
   component:Home,
   children:[
     {
       path:"/",
       name:"highchartsUse",
       component:highchartsUse,
     },
     {
       path:"/highchartsMapUse",
       name:"highchartsMapUse",
       component:highchartsMapUse,
     },
     {
       path:"/canvasUse",
       name:"canvasUse",
       component:canvasUse,
     },
     {
       path:"/componentValueTransfer",
       name:"componentValueTransfer",
       component:componentValueTransfer,
     },
   ]
 }
];

const router = new VueRouter({
  routes,
});

export default router;

import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/pubilc/Home.vue"
import highchartsUse from "../views/highchartsUse";
import highchartsMapUse from "../views/highchartsMapUse";
import componentValueTransfer from "../views/componentValueTransfer";
import pixi from "../views/pixi";
import pixiDraw from "../views/pixiDraw";
import three from "../views/three";
import threeUse from "../views/threeUse";
import fabricjs from "../views/fabricjs";
import searchBar from "../views/searchBar";
import expressionVerification from "../views/expressionVerification";
import dragAndDrop from "../views/dragAndDrop";

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
       path:"/componentValueTransfer",
       name:"componentValueTransfer",
       component:componentValueTransfer,
     },
     {
       path:"/pixi",
       name:"pixi",
       component:pixi,
     },
     {
       path:"/pixiDraw",
       name:"pixiDraw",
       component:pixiDraw,
     },
     {
       path:"/three",
       name:"three",
       component:three,
     },
     {
       path:"/threeUse",
       name:"threeUse",
       component:threeUse,
     },
     {
       path:"/fabricjs",
       name:"fabricjs",
       component:fabricjs,
     },
     {
       path:"/searchBar",
       name:"searchBar",
       component:searchBar,
     },
     {
       path:"/expressionVerification",
       name:"expressionVerification",
       component:expressionVerification,
     },
     {
       path:"/dragAndDrop",
       name:"dragAndDrop",
       component:dragAndDrop,
     },
   ]
 }
];

const router = new VueRouter({
  routes,
});

export default router;

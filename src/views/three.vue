<!--<template>-->
<!--  <div id="three">-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--// import * as THREE from "three";-->
<!--// import { OBJLoader, MTLLoader } from "three-obj-mtl-loader";-->
<!--// import OrbitControls from "three-orbitcontrols";-->
<!--// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";-->

<!--const scene = new THREE.Scene();-->

<!--export default {-->
<!--  name: "three",-->
<!--  data() {-->
<!--    return {-->
<!--      container: "",-->
<!--      stats: "",-->
<!--      camera: "",-->
<!--      scene: "",-->
<!--      renderer: "",-->
<!--      mouseX: "",-->
<!--      mouseY: "",-->
<!--      windowHalfX: "",-->
<!--      windowHalfY: ""-->
<!--    };-->
<!--  },-->
<!--  mounted() {-->
<!--    scene.background = new THREE.Color(0x000000)-->

<!--    let geometry = new THREE.BoxGeometry(50, 100, 100); //创建一个立方体几何对象Geometry-->
<!--    let material = new THREE.MeshLambertMaterial({-->
<!--      color: 0xff0000-->

<!--    });-->

<!--    let mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh-->
<!--    // scene.add(mesh); //网格模型添加到场景中-->

<!--    let box = new THREE.SphereGeometry(60, 40, 40);-->
<!--    let material2 = new THREE.MeshLambertMaterial({-->
<!--      color: 0x0000ff-->

<!--    });-->
<!--    let mesh2 = new THREE.Mesh(box, material2); //网格模型对象Mesh-->
<!--    // scene.add(mesh2);-->
<!--    mesh2.translateY(120);-->

<!--    // let axisHelper = new THREE.AxesHelper(2500);-->
<!--    // scene.add(axisHelper);-->
<!--    /**-->
<!--     * 光源设置-->
<!--     */-->
<!--      //点光源-->
<!--    let point = new THREE.PointLight(0x080820);-->
<!--    point.position.set(500, 500, 1000); //点光源位置-->
<!--    scene.add(point); //点光源添加到场景中-->

<!--    // 点光源2  位置和point关于原点对称-->
<!--    // let point2 = new THREE.PointLight(0xffffff);-->
<!--    // point2.position.set(-400, -200, -300); //点光源位置-->
<!--    // scene.add(point2); //点光源添加到场景中-->

<!--    const hemiLigth = new THREE.HemisphereLight(0xffeeb1,0x080820,2)-->
<!--    scene.add(hemiLigth)-->
<!--    //环境光-->
<!--    // let ambient = new THREE.AmbientLight(0x0000ff);-->
<!--    // scene.add(ambient);-->
<!--    // console.log(scene)-->
<!--    // console.log(scene.children)-->
<!--    /**-->
<!--     * 相机设置-->
<!--     */-->
<!--    let width = window.innerWidth ; //窗口宽度-->
<!--    let height = window.innerHeight ; //窗口高度-->
<!--    let k = width / height; //窗口宽高比-->
<!--    let s = 300; //三维场景显示范围控制系数，系数越大，显示的范围越大-->
<!--    //创建相机对象-->
<!--    let camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);-->
<!--    camera.position.set(100, 100, 100); //设置相机位置-->
<!--    camera.lookAt(scene.position); //设置相机方向(指向的场景对象)-->
<!--    /**-->
<!--     * 创建渲染器对象-->
<!--     */-->
<!--    let renderer = new THREE.WebGLRenderer();-->
<!--    renderer.setSize(width, height);//设置渲染区域尺寸-->
<!--    renderer.setClearColor(0xb9d3ff, 5); //设置背景颜色-->
<!--    document.getElementById("three").appendChild(renderer.domElement); //body元素中插入canvas对象-->
<!--    //执行渲染操作   指定场景、相机作为参数-->
<!--    renderer.render(scene, camera);-->

<!--    let objLoader = new OBJLoader();-->
<!--    let mtlLoader = new MTLLoader();-->
<!--    mtlLoader.load("/static/fontana.mtl", function(materials) {-->
<!--      // materials.preload();-->
<!--      objLoader.setMaterials(materials);-->
<!--      console.log(materials);-->
<!--      objLoader.load(-->
<!--        "static/fontana.obj",-->
<!--        function(obj) {-->
<!--          obj.position.set(0, 0, 0);-->
<!--          obj.scale.set(1, 1, 1);-->
<!--          scene.add(obj);-->
<!--          console.log(scene);-->
<!--          renderer.render(scene,camera)-->
<!--        },-->
<!--        function(xhr) {-->
<!--          console.log((xhr.loaded / xhr.total) * 100 + "% loaded");-->
<!--        },-->
<!--        function(error) {-->
<!--          console.log("An error happened");-->
<!--        }-->
<!--      );-->
<!--    })-->

<!--    // const loader=new GLTFLoader();-->
<!--    // loader.load('/static/ha.gltf',-->
<!--    //   //成功的回调-->
<!--    //   function(gltf){-->
<!--    //     //将模型加入到场景中-->
<!--    //     gltf.scene.scale.set(100,100,100)-->
<!--    //     scene.add(gltf.scene);-->
<!--    //     //渲染场景-->
<!--    //     renderer.render(scene,camera);-->
<!--    //   },-->
<!--    //   //加载过程中的回调-->
<!--    //   function(xhr){-->
<!--    //     console.log((xhr.loaded/xhr.total*100)+'% loaded')-->
<!--    //   },-->
<!--    //   //加载出错时的回调-->
<!--    //   function(error){-->
<!--    //     console.log("An error happened");-->
<!--    //   }-->
<!--    // )-->

<!--    function render() {-->
<!--      renderer.render(scene, camera);//执行渲染操作-->
<!--      // mesh.rotateY(0.01);//每次绕y轴旋转0.01弧度-->
<!--      // requestAnimationFrame(render);//请求再次执行渲染函数render-->
<!--    }-->

<!--    render();-->
<!--    let controls = new THREE.OrbitControls(camera, renderer.domElement);//创建控件对象-->
<!--    // // 已经通过requestAnimationFrame(render);周期性执行render函数，没必要再通过监听鼠标事件执行render函数-->
<!--    controls.addEventListener('change', render)-->
<!--    // controls.minZoom = 0.5;-->
<!--    // controls.maxZoom = 2;-->

<!--  },-->
<!--};-->

<!--</script>-->

<!--<style scoped>-->

<!--</style>-->
<template>
  <div style="width: 100%; height: 90%">
    <div id="three" ref="three">
    </div>
    <button @click="changePostion">111</button>
  </div>

</template>

<script>
import * as THREE from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"

let fire
export default {
  name: "three",
  data() {
    return {
      camera: "",
      scene: "",
      renderer: "",
      pointLights:[],
      spotLights:[],

    };
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color( 0x000000 );
      /**
       * 相机设置
       */
      let width = this.$refs.three.clientWidth; //窗口宽度
      let height = this.$refs.three.clientHeight; //窗口高度
      let k = width / height; //窗口宽高比
      let s = 100; //三维场景显示范围控制系数，系数越大，显示的范围越大
      //创建相机对象
      this.camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
      this.camera.position.set(100, 100, 100); //设置相机位置
      this.camera.lookAt(this.scene.position); //设置相机方向(指向的场景对象)

      /**
       * 创建渲染器对象
       */
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(width, height);//设置渲染区域尺寸
      this.renderer.setClearColor(0x000000, 5); //设置背景颜色
      document.getElementById("three").appendChild(this.renderer.domElement); //body元素中插入canvas对象
      //执行渲染操作   指定场景、相机作为参数
      this.renderer.render(this.scene, this.camera);

      this.loadLight()
      this.loadModel()
      this.loadHelper()
      // this.loadGltf()
      this.loadChange()
      this.render();

    },

    //创建鼠标控制对象
    loadChange(){
      let controls = new OrbitControls(this.camera, this.renderer.domElement)
      controls.addEventListener('change',this.render)
    },

    //加载辅助线
    loadHelper(){
      let axisHelper = new THREE.AxesHelper(2500);
      this.scene.add(axisHelper);
    },

    loadLight(){
      //点光源
      let point =new THREE.PointLight(0xffffff, 1000, 1000,)
      point.position.set(200, 200, 100); //点光源位置
      this.scene.add(point); //点光源添加到场景中

      let point2 = point.clone()
      let point3 = point.clone()
      //
      // point2.position.set(100, 100, 50)
      point2.color.set(0xffffff)
      // point3.position.set(50, 50, 50)

      this.scene.add(point2,point3)
      this.pointLights.push(point,point2,point3)

      // let hemiLigth = new THREE.HemisphereLight(0xFFFFFF, 0x000000, 0.5)
      // this.scene.add(hemiLigth)
      //环境光
      // let ambientLight = new THREE.AmbientLight( 0xcccccc, 0.1 );
      // this.scene.add(ambientLight);

    },

    //加载Gltf
    loadGltf() {
      let that = this
      const loader = new GLTFLoader();
      loader.load('/static/kda_evelynn_dance_stage_moonlight_edition/scene.gltf',
          //成功的回调
          function (gltf) {
            //将模型加入到场景中
            // gltf.position.set(0, 0, 0);
            // gltf.scale.set(0.1, 0.1, 0.1);
            that.scene.add(gltf.scene);
            //渲染场景
            that.renderer.render(that.scene, that.camera);
            console.log("成功")
          },
          //加载过程中的回调
          function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded')
          },
          //加载出错时的回调
          function (error) {
            console.log("An error happened");
          }
      )
    },

    //加载自定义模型
    loadModel(){
      let geometry = new THREE.BoxGeometry(5, 10, 10); //创建一个立方体几何对象Geometry
      let material = new THREE.MeshLambertMaterial({
        color: 0xff0000
      });

      let mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
      this.scene.add(mesh); //网格模型添加到场景中

      // let box = new THREE.SphereGeometry(60, 40, 40);
      // let material2 = new THREE.MeshLambertMaterial({
      //   color: 0x0000ff
      // });
      // let mesh2 = new THREE.Mesh(box, material2); //网格模型对象Mesh
      // this.scene.add(mesh2);
      // mesh2.translateY(120);
    },

    //重新执行渲染
    render() {
      this.renderer.render(this.scene, this.camera);
    },
    changePostion(){
      console.log(this.pointLights[1])
      this.pointLights[1].color = 0x90EE90
      console.log(this.pointLights[1])
      this.render()
    }
  }

};

</script>

<style scoped>
#three {
  width: 100%;
  height: 100%;
  background-color: #888888;
}
</style>
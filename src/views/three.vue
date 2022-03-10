<template>
  <div id="three" ref="three"></div>
</template>

<script>
import * as THREE from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";


export default {
  name: "three",
  data() {
    return {
      camera: "",
      scene: "",
      renderer: "",
    };
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color( 0x72645b );
      /**
       * 相机设置
       */
      let width = this.$refs.three.clientWidth; //窗口宽度
      let height = this.$refs.three.clientHeight; //窗口高度
      let k = width / height; //窗口宽高比
      let s = 10; //三维场景显示范围控制系数，系数越大，显示的范围越大
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
      // this.loadObj()
      this.loadHelper()
      this.loadGltf()
      // this.loadChange()
      this.render();

    },

    //创建鼠标控制对象
    // loadChange(){
    //   let controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);//创建控件对象
    //   controls.addEventListener('change', this.render)
    // },

    //加载辅助线
    loadHelper(){
      let axisHelper = new THREE.AxesHelper(2500);
      this.scene.add(axisHelper);
    },

    loadLight(){
      //点光源
      let point = new THREE.PointLight(0x800080);
      point.position.set(200, 200, 100); //点光源位置
      this.scene.add(point); //点光源添加到场景中

      // 点光源2  位置和point关于原点对称
      let point2 = new THREE.PointLight(0xffffff);
      point2.position.set(-400, -200, -300); //点光源位置
      this.scene.add(point2); //点光源添加到场景中

      let hemiLigth = new THREE.HemisphereLight(0xFFFFFF, 0x000000, 0.5)
      this.scene.add(hemiLigth)
      //环境光
      let ambientLight = new THREE.AmbientLight( 0xcccccc, 0.1 );
      this.scene.add(ambientLight);

    },

    //加载OBJ
    // loadObj() {
    //   let that = this
    //   let objLoader = new OBJLoader();
    //   let mtlLoader = new MTLLoader();
    //   mtlLoader.load("/static/666.mtl", function (materials) {
    //     materials.preload();
    //     objLoader.setMaterials(materials);
    //     objLoader.load(
    //         "static/Aoi.obj",
    //         function (obj) {
    //           obj.position.set(0, 0, 0);
    //           obj.scale.set(0.05, 0.05, 0.05);
    //           that.scene.add(obj);
    //           that.renderer.render(that.scene, that.camera)
    //         },
    //         function (xhr) {
    //           console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    //         },
    //         function (error) {
    //           console.log(error);
    //         }
    //     );
    //   })
    // },

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
      let geometry = new THREE.BoxGeometry(50, 100, 100); //创建一个立方体几何对象Geometry
      let material = new THREE.MeshLambertMaterial({
        color: 0xff0000
      });

      let mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
      scene.add(mesh); //网格模型添加到场景中

      let box = new THREE.SphereGeometry(60, 40, 40);
      let material2 = new THREE.MeshLambertMaterial({
        color: 0x0000ff
      });
      let mesh2 = new THREE.Mesh(box, material2); //网格模型对象Mesh
      scene.add(mesh2);
      mesh2.translateY(120);
    },

    //重新执行渲染
    render() {
      this.renderer.render(this.scene, this.camera);
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
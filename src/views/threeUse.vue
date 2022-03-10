<template>
  <div ref="three" id="three"></div>
</template>

<script>
import * as THREE from "three";
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"

let rotateAngle = 0
export default {
  name: "threeUse",
  data() {
    return {
      scene: null,//场景
      camera: null,
      renderer: null,//渲染器
      controls:null,
      mixer: null,
      clock: null,
      actions: [],
      sphereLightMesh:null,
      sphereLightGeo:null,
      pointLight:null,
    }
  },

  mounted() {
    this.init()
    this.clock = new THREE.Clock();
  },

  methods: {
    init() {
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x000000);

      this.camera = new THREE.PerspectiveCamera(100, this.$refs.three.clientWidth / this.$refs.three.clientHeight, 0.1, 1000);
      this.camera.position.set(8, 2, 0)//相机位置
      this.camera.lookAt(new THREE.Vector3(0, 0, 0))// 相机视野中心
      // this.camera.lookAt(this.scene.position)// 相机视野中心
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.shadowMap.enabled = true// 渲染器渲染阴影效果
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap// 阴影类型
      this.renderer.outputEncoding = THREE.sRGBEncoding// 色域，鲜明渲染，常规rgb颜色渲染
      this.renderer.setSize(this.$refs.three.clientWidth, this.$refs.three.clientHeight);
      document.getElementById('three').appendChild(this.renderer.domElement);
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)

      // 簡單的地板
      // const planeGeometry = new THREE.PlaneGeometry(200, 200)
      // const planeMaterial = new THREE.MeshLambertMaterial({ color: 0x000000 })
      // let plane = new THREE.Mesh(planeGeometry, planeMaterial)
      // plane.receiveShadow = true
      // plane.rotation.x = -0.5 * Math.PI // 使平面與 y 軸垂直，並讓正面朝上
      // plane.position.set(0, -7, 0)
      // this.scene.add(plane)
      // this.loadHelper()
      this.loadLight()
    },

    loadLight() {
      // 設置環境光 AmbientLight
      let ambientLight = new THREE.AmbientLight(0x800080)
      this.scene.add(ambientLight)

      // 設置點光源 PointLight
      let pointLight1 = new THREE.PointLight(0x800080)
      pointLight1.position.set(0, 20, 20)
      pointLight1.castShadow = true
      this.scene.add(pointLight1)

      // 設置聚光燈 SpotLight
      let spotLight = new THREE.SpotLight(0x800080)
      spotLight.position.set(0, 60, 20)
      spotLight.castShadow = true
      this.scene.add(spotLight)

      // 設置平行光 DirectionalLight
      let directionalLight = new THREE.DirectionalLight(0x800080)
      directionalLight.position.set(-10, 60, 20)
      directionalLight.castShadow = true
      this.scene.add(directionalLight)

      this.pointLight = new THREE.SpotLight(0xFF0000,5,60,Math.PI/9) // 顏色, 強度, 距離
      this.pointLight.castShadow = true // 投影
      this.scene.add(this.pointLight)

// 小球體模擬點光源實體
      const sphereLightGeo = new THREE.SphereGeometry(0.3)
      const sphereLightMat = new THREE.MeshBasicMaterial({ color: 0xFF0000 })
      this.sphereLightMesh = new THREE.Mesh(sphereLightGeo, sphereLightMat)
      this.sphereLightMesh.castShadow = true
      this.sphereLightMesh.position.y = 10
      this.scene.add(this.sphereLightMesh)

      this.addModel()
    },

    //加载辅助线
    loadHelper() {
      let axisHelper = new THREE.AxesHelper(2500);
      this.scene.add(axisHelper);
    },

    addModel() {
      let that = this
      const loader = new GLTFLoader();
      loader.load('/static/kda_evelynn_dance_stage_moonlight_edition/scene.gltf',
          //成功的回调
          function (gltf) {
            gltf.scene.position.set(0, -50, 0);
            gltf.scene.scale.set(3, 3, 3);
            that.scene.add(gltf.scene);

            // 新建一个AnimationMixer
            // that.mixer = new THREE.AnimationMixer(gltf.scene)
            // const clip = gltf.animations[0] //将第1帧动画设置为动画剪辑对象
            // const action = that.mixer.clipAction(clip) //使用动画剪辑对象创建AnimationAction对象
            // that.mixer.timeScale = 2 //默认1，可以调节播放速度
            // action.setDuration(5).play() //设置单此循环的持续时间(setDuration也可以调节播放速度)并开始动画

            console.log("成功")
            that.render()
          },
          //加载过程中的回调
          function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded')
          },
          //加载出错时的回调
          function (error) {
            console.log(error);
          }
      )
      // loader.load('/static/ufo_vr_mega_club/scene.gltf',
      //     //成功的回调
      //     function (gltf) {
      //       //将模型加入到场景中
      //       gltf.scene.position.set(0, 0, 0);
      //       gltf.scene.scale.set(3, 3, 3);
      //       that.scene.add(gltf.scene);
      //
      //       // 新建一个AnimationMixer
      //       // that.mixer = new THREE.AnimationMixer(gltf.scene)
      //       // const clip = gltf.animations[0] //将第1帧动画设置为动画剪辑对象
      //       // const action = that.mixer.clipAction(clip) //使用动画剪辑对象创建AnimationAction对象
      //       // that.mixer.timeScale = 2 //默认1，可以调节播放速度
      //       // action.setDuration(5).play() //设置单此循环的持续时间(setDuration也可以调节播放速度)并开始动画
      //
      //       console.log("成功")
      //       that.render()
      //     },
      //     //加载过程中的回调
      //     function (xhr) {
      //       console.log((xhr.loaded / xhr.total * 100) + '% loaded')
      //     },
      //     //加载出错时的回调
      //     function (error) {
      //       console.log(error);
      //     }
      // )
    },

    pointLightAnimation() {
      if (rotateAngle > 2 * Math.PI) {
        rotateAngle = 0 // 超過 360 度後歸零
      } else {
        rotateAngle += 0.03 // 遞增角度
      }
      // 光源延橢圓軌道繞 Y 軸旋轉
      this.sphereLightMesh.position.x = 3 * Math.cos(rotateAngle)
      this.sphereLightMesh.position.z = 3 * Math.sin(rotateAngle)

      // 點光源位置與球體同步
      this.pointLight.position.copy(this.sphereLightMesh.position)
    },

    //渲染
    render() {
      // if (this.mixer) {
      //   const delta = this.clock.getDelta() // 获取自上次调用的时间差
      //   this.mixer.update(delta)
      // }
      this.pointLightAnimation()
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.render)
    }
  }
}
</script>

<style scoped>
#three {
  width: 100%;
  height: 100%;
}

</style>
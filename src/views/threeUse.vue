<template>
  <div ref="three" id="three"></div>
</template>

<script>
import * as THREE from "three";
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"

let rotateAngle = 0
let audio = null
export default {
  name: "threeUse",
  data() {
    return {
      scene: null,//场景
      camera: null,
      renderer: null,//渲染器
      controls: null,
      pointLights: {},
      spotLights: {},
      pointLightsOnOff: true,
      mixer: null,
      clock: null,
      box1: null,
      box2: null,
      analyser: null,//音频样本
      isStart: false,//是否在播放
      colors:[0xFF69B4,0xFFFFF0,0xE0FFFF,0xFAFAD2,0xFFA07A,0xFFE4E1,0xFFA500,0x800080],
      colorNum:0,
    }
  },

  mounted() {
    this.init()
    this.clock = new THREE.Clock();
    window.addEventListener('keydown', this.operation)
  },

  methods: {
    init() {
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x000000);

      this.camera = new THREE.PerspectiveCamera(75, this.$refs.three.clientWidth / this.$refs.three.clientHeight, 0.1, 1000);
      this.camera.position.set(15, 3, 0)
      this.camera.lookAt(new THREE.Vector3(0, 0, 0))// 相机视野中心

      this.renderer = new THREE.WebGLRenderer(
          {antialias: true,}
      );
      this.renderer.shadowMap.enabled = true
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
      this.renderer.outputEncoding = THREE.sRGBEncoding// 色域，鲜明渲染，常规rgb颜色渲染
      this.renderer.setSize(this.$refs.three.clientWidth, this.$refs.three.clientHeight);
      document.getElementById('three').appendChild(this.renderer.domElement);
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      // this.controls.autoRotate = true
      this.controls.enableDamping = true //阻尼

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
      let pointLight1 = new THREE.PointLight(0xFF0000, 10, 30, Math.PI / 4)
      pointLight1.position.set(-30, 20, 25)
      pointLight1.castShadow = true

      this.pointLights.leftRear = pointLight1
      this.scene.add(this.pointLights.leftRear)

      this.pointLights.rightRear = pointLight1.clone()
      this.pointLights.rightRear.position.set(-20, 20, -25)
      this.scene.add(this.pointLights.rightRear)

      this.pointLights.leftFront = pointLight1.clone()
      this.pointLights.leftFront.position.set(3, 1.5, 7)
      // this.pointLights.leftFront.color = 0xFF0000
      this.pointLights.leftFront.intensity = 10
      this.pointLights.leftFront.distance = 5
      this.pointLights.leftFront.decay = Math.PI / 2
      this.scene.add(this.pointLights.leftFront)

      this.pointLights.rightFront = pointLight1.clone()
      this.pointLights.rightFront.position.set(3, 1.5, -7)
      // this.pointLights.rightFront.color = 0xFF0000
      this.pointLights.rightFront.intensity = 10
      this.pointLights.rightFront.distance = 5
      this.pointLights.rightFront.decay = Math.PI / 2
      this.scene.add(this.pointLights.rightFront)

      this.pointLights.movePointlineRed = pointLight1.clone()
      this.pointLights.movePointlineRed.position.set(0, 0, 0)
      this.pointLights.movePointlineRed.intensity = 20
      this.pointLights.movePointlineRed.distance = 10
      this.pointLights.movePointlineRed.decay = Math.PI / 9
      this.scene.add(this.pointLights.movePointlineRed)

      let pointLight2 = new THREE.PointLight(0x800080, 1000, 20, Math.PI)
      pointLight2.position.set(-40, 25, 0)
      pointLight2.castShadow = true
      this.pointLights.DJ = pointLight2
      this.pointLights.DJFront = pointLight2.clone()
      this.pointLights.DJFront.position.set(-10, 20, 0)
      this.pointLights.DJFront.intensity = 10
      this.pointLights.DJFront.distance = 30
      this.pointLights.DJFront.decay = Math.PI / 4
      this.scene.add(this.pointLights.DJ, this.pointLights.DJFront)

      // 設置聚光燈 SpotLight
      let spotLight = new THREE.SpotLight(0x800080, 60, 70, Math.PI / 9)
      spotLight.angle = Math.PI/16
      spotLight.position.set(-45, 20, 0)
      spotLight.castShadow = true

      this.spotLights.dance = spotLight
      this.scene.add(this.spotLights.dance)

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
          function (gltf) {
            gltf.scene.position.set(0, -50, 0);
            gltf.scene.scale.set(3, 3, 3);
            that.scene.add(gltf.scene);
            console.log("成功")
          }, function (xhr) {

          }, function (error) {

          })
      loader.load('/static/cyber_pulse/scene.gltf',
          function (gltf) {
            gltf.scene.position.set(-40, 25, 0);
            gltf.scene.scale.set(2, 2, 2);
            that.box1 = gltf.scene.clone()
            that.box2 = gltf.scene.clone()
            that.box1.scale.set(1, 1, 1);
            that.box2.scale.set(1, 1, 1);
            that.box1.position.set(-30, 10, -35)
            that.box2.position.set(-30, 10, 35)
            that.scene.add(gltf.scene, that.box1, that.box2);
            // 新建一个AnimationMixer
            that.mixer = new THREE.AnimationMixer(gltf.scene)
            const clip = gltf.animations[0] //将第1帧动画设置为动画剪辑对象
            const action = that.mixer.clipAction(clip) //使用动画剪辑对象创建AnimationAction对象
            that.mixer.timeScale = 2 //默认1，可以调节播放速度
            action.setDuration(5).play() //设置单此循环的持续时间(setDuration也可以调节播放速度)并开始动画
            console.log("成功")
            that.render()
          }, function (xhr) {

          }, function (error) {

          })
    },
    operation(e) {
      if (e.keyCode == 32 && this.isStart === false && audio === null) {
        this.music()
        this.isStart = true
      } else if (e.keyCode == 32 && this.isStart === true && audio !== null) {
        this.isStart = false
        audio.pause()
      } else if (e.keyCode == 32 && this.isStart === false && audio !== null) {
        audio.play()
        this.isStart = true
      }
      if (e.keyCode == 76) {
        this.onOffPointLight()
      }
      if (e.keyCode == 65) {
        this.changePointLightsColor()
      }
    },
    music() {
      let listener = new THREE.AudioListener()
      audio = new THREE.Audio(listener);
      let audioLoader = new THREE.AudioLoader();
      let that = this
      audioLoader.load('static/AHAH.mp3', function (AudioBuffer) {
        audio.setBuffer(AudioBuffer);
        audio.setLoop(false);
        audio.setVolume(1);
        audio.play();
        that.analyser = new THREE.AudioAnalyser(audio);
      });

    },

    pointLightAnimation() {
      if (rotateAngle > 2 * Math.PI) {
        rotateAngle = 0
      } else {
        rotateAngle += 0.03
      }
      // 光源延橢圓軌道繞 Y 軸旋轉
      this.pointLights.movePointlineRed.position.x = 3 * Math.cos(rotateAngle)
      this.pointLights.movePointlineRed.position.z = 3 * Math.sin(rotateAngle)

    },

    shake() {
      if (this.box1.scale.x === 1) {
        this.box2.scale.set(1.1, 1.1, 1.1)
        this.box1.scale.set(1.1, 1.1, 1.1)
        setTimeout(() => {
          this.box2.scale.set(1, 1, 1)
          this.box1.scale.set(1, 1, 1)
        }, 100)
      } else {
        this.box2.scale.set(1, 1, 1)
        this.box1.scale.set(1, 1, 1)
        setTimeout(() => {
          this.box2.scale.set(1.1, 1.1, 1.1)
          this.box1.scale.set(1.1, 1.1, 1.1)
        }, 100)
      }
    },

    changePointLightsColor(){
      for (let i in this.pointLights) {
        this.pointLights[i].color = new THREE.Color(this.colors[this.colorNum])
      }
      this.colorNum++
      if ( this.colorNum === this.colors.length -1 ){
        this.colorNum = 0
      }
      console.log(this.colorNum)
    },

    onOffPointLight() {
      if (this.pointLightsOnOff === true) {
        for (let i in this.pointLights) {
          this.pointLights[i].visible = false
        }
      } else {
        for (let i in this.pointLights) {
          this.pointLights[i].visible = true
        }
      }
      this.pointLightsOnOff = !this.pointLightsOnOff
    },
    //渲染
    render() {
      if (this.mixer) {
        const delta = this.clock.getDelta() // 获取自上次调用的时间差
        this.mixer.update(delta)
      }
      if (this.analyser) {
        if (this.analyser.getFrequencyData()[0] > 200) {
          this.shake()
          this.changePointLightsColor()
        }
      }
      // this.controls.update();
      this.pointLightAnimation()
      this.controls.update()
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.render)
    },
  },
  beforeDestroy() {
    this.$refs.three.removeEventListener('keydown', this.operation)
  }
}
</script>

<style scoped>
#three {
  width: 100%;
  height: 100%;
}

</style>
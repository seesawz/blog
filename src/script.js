import './style.css'
import * as THREE from 'three'
//控制器不包含在class内
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import GUI from 'lil-gui';
import gsap from 'gsap'
import { FontLoader, TextBufferGeometry } from 'three';


const canvas = document.querySelector('canvas.webgl')

//创建场景
const scene = new THREE.Scene()

const size = {
  height: window.innerHeight,
  width: window.innerWidth
}

//创建透视相机
const camera = new THREE.PerspectiveCamera(75, size.width / size.height, 1, 100)
scene.add(camera)


/* 
  textures
*/
const textureLoader = new THREE.TextureLoader()

const matcapsTexture = textureLoader.load('/matcaps/2.png')


const fontLoader = new FontLoader()

fontLoader.load('/fonts/helvetiker_regular.typeface.json',
  (font) => {
    const textGeometry = new TextBufferGeometry('Hello This is seesaw',
      {
        font: font,
        size: 0.5,
        height: 0.2,
        //关于三角形的数量
        curveSegments: 1,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        //关于圆角
        bevelSegments: 5
      })

    textGeometry.computeBoundingBox()
    textGeometry.translate(
      //这里真的很难解释，建议去看12集对应的部分
      -(textGeometry.boundingBox.max.x - 0.02) * 0.5,
      -(textGeometry.boundingBox.max.y - 0.02) * 0.5,
      -(textGeometry.boundingBox.max.z - 0.03) * 0.5
    )

    //textGeometry.center()

    console.log(textGeometry.boundingBox)

    const textMaterial = new THREE.MeshMatcapMaterial({
      //wireframe: true
      matcap: matcapsTexture
    })
    const text = new THREE.Mesh(textGeometry, textMaterial)
    scene.add(text)

  })


camera.position.z = 3

//renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

const clock = new THREE.Clock()

function tick() {
  const elapsedTime = clock.getElapsedTime()

  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}
tick()

renderer.setSize(size.width, size.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.render(scene, camera)

window.addEventListener('resize', () => {
  //update sizes
  size.width = window.innerWidth
  size.height = window.innerHeight

  //update camera 
  camera.aspect = size.width / size.height
  camera.updateProjectionMatrix()

  //updare renderer
  renderer.setSize(size.width, size.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


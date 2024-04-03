import './style.css'
import * as THREE from 'three'
//控制器不包含在class内
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import GUI from 'lil-gui';
import gsap from 'gsap'


image.src = '/textures/door/color.jpg'

const cursor = {
  x: 0,
  y: 0
}

window.addEventListener('mousemove', (event) => {
  cursor.x = event.clientX / sizes.width - 0.5
  cursor.y = - (event.clientY / sizes.height - 0.5)
})

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener('resize', () => {
  //update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  //update camera 
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  //updare renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener('dblclick', () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
})


// Camera 透视相机
//第3-4个参数是控制相机的可视距离
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 100)
//controls
const controls = new OrbitControls(camera, canvas)
//controls.enabled = false
controls.enableDamping = true

//正交相机

// //正交相机会随着画布的尺寸拉伸场景，所以我们需要计算画布的宽高比
// const aspectRatio = sizes.width / sizes.height
//
// //在这种投影模式下，无论物体距离相机近或者远，他们的大小都不会变化
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 1, 100)

// camera.position.z = 2
// camera.position.x = 2
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
//设置像素比最高为2
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const clock = new THREE.Clock()
function tick() {
  //控制渲染的帧率
  const elapsedTime = clock.getElapsedTime()
  //mesh.rotation.y = elapsedTime
  //mesh.position.x = Math.sin(elapsedTime)

  //update camera
  // camera.position.x = Math.sin(cursor.x * 10) * 3
  // camera.position.z = Math.cos(cursor.x * 10) * 3
  // camera.position.y = cursor.y * 5
  // camera.lookAt(mesh.position)

  //update controls
  controls.update()

  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}
tick()

/* 
*  Debug
*/
const gui = new GUI();
//最后一个参数是区间和步长
gui.add(mesh.position, 'y', -3, 3, 0.01)
gui
  .add(mesh.position, 'x')
  .min(-3)
  .max(3)
  .step(0.01)
  .name('positionX')

gui.add(mesh, 'visible')
gui.add(material, 'wireframe')
gui.addColor(material, 'color')
gui.add({
  spin: () => {
    gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 })
  }
}, 'spin')

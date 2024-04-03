import './style.css'
import * as THREE from 'three'
//控制器不包含在class内
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const cursor = {
  x: 0,
  y: 0
}

window, addEventListener('mousemove', (event) => {
  cursor.x = event.clientX / sizes.width - 0.5
  cursor.y = - (event.clientY / sizes.height - 0.5)
})

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

// Camera 透视相机
//第3-4个参数是控制相机的可视距离
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 100)
//controls
const controls = new OrbitControls(camera, canvas)
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

/* let time = Date.now()
function tick() {
  //控制渲染的帧率
  const currentTime = Date.now()
  const deltaTime = currentTime - time
  time = currentTime
  mesh.rotation.y += 0.001 * deltaTime

  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}
tick() */

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

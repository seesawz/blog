import './style.css'

import * as THREE from 'three'

//创建场景
const scene = new THREE.Scene()
//创建正方体
const geometry = new THREE.BoxGeometry(1, 1, 1)
//创建材质
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })

const group = new THREE.Group()
scene.add(group)

const cube1 = new THREE.Mesh(geometry, material)
group.add(cube1)

const cube2 = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0x00ff00 }))
group.add(cube2)
cube2.position.x = -2

const cube3 = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0x0000ff }))
group.add(cube3)
cube3.position.x = 2
group.position.y = 1
group.scale.y = 2
group.rotation.y = 1

const axesHelper = new THREE.AxesHelper(3)
scene.add(axesHelper)
//camera
const size = {
  width: 800,
  height: 600,
}

const camera = new THREE.PerspectiveCamera(75, size.width / size.height)
scene.add(camera)
camera.position.z = 3

//Renderer
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(size.width, size.height)

renderer.render(scene, camera)

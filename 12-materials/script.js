import './style.css'
import * as THREE from 'three'
//控制器不包含在class内
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import GUI from 'lil-gui';
import gsap from 'gsap'

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
  objects
*/
const cubeTextureLoader = new THREE.CubeTextureLoader()

const environmentMapTexture = cubeTextureLoader.load([
  '/environmentMaps/0/px.jpg',
  '/environmentMaps/0/nx.jpg',
  '/environmentMaps/0/py.jpg',
  '/environmentMaps/0/ny.jpg',
  '/environmentMaps/0/pz.jpg',
  '/environmentMaps/0/nz.jpg',
])


const textureLoader = new THREE.TextureLoader()
const matcapsTexture = textureLoader.load('/matcaps/6.png')
const doorColorTexture = textureLoader.load('/textures/door/color2.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorMetanessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorAhphaTexture = textureLoader.load('/textures/door/alpha.jpg')
// const gradientTexture = textureLoader.load('/gradients/3.jpg')
// gradientTexture.minFilter = THREE.NearestFilter
// gradientTexture.magFilter = THREE.NearestFilter

const ambientOcculusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')


// const colorTexture = new textureLoader.load('/textures/minecraft.png')
// colorTexture.magFilter = THREE.NearestFilter
// const material = new THREE.MeshBasicMaterial({
//   map: colorTexture
// })

//const material = new THREE.MeshNormalMaterial()
//material.flatShading = true

// const material = new THREE.MeshMatcapMaterial({
//   matcap: matcapsTexture
// })

/* const material = new THREE.MeshPhongMaterial()
//反射光的强度
material.shininess = 100
//高光的颜色
material.specular = new THREE.Color(0x1188ff) */

// const material = new THREE.MeshToonMaterial()
// material.gradientMap = gradientTexture

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.65
material.roughness = 0.45
material.envMap = environmentMapTexture
/* material.map = doorColorTexture
material.aoMap = ambientOcculusionTexture
material.aoMapIntensity = 1
material.displacementMap = doorHeightTexture
material.displacementScale = 0.05
material.metalnessMap = doorMetanessTexture
material.roughnessMap = doorRoughnessTexture
material.normalMap = doorNormalTexture
material.normalScale.set(0.5, 0.5)
material.alphaMap = doorAhphaTexture
//想要用alpha贴图就必须添加透明属性
material.transparent = true */
//material.wireframe = true

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

const sphere = new THREE.Mesh(
  new THREE.SphereBufferGeometry(0.5, 64, 64),
  material
)

sphere.geometry.setAttribute('uv2', new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2))


const plane = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(1, 1, 100, 100),
  material
)
plane.position.x = 1.5

plane.geometry.setAttribute('uv2', new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2))

const torus = new THREE.Mesh(
  new THREE.TorusBufferGeometry(0.5, 0.2, 64, 128),
  material
)
torus.position.x = -1.5

torus.geometry.setAttribute('uv2', new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2))

scene.add(sphere, plane, torus)

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

  //update objects
  sphere.rotation.y = 0.1 * elapsedTime
  plane.rotation.y = 0.1 * elapsedTime
  torus.rotation.y = 0.1 * elapsedTime

  sphere.rotation.x = 0.1 * elapsedTime
  plane.rotation.x = 0.1 * elapsedTime
  torus.rotation.x = 0.1 * elapsedTime

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

const gui = new GUI()

gui.add(material, 'metalness').min(0).max(1).step(0.0001).name('Metalness')
gui.add(material, 'roughness').min(0).max(1).step(0.0001).name('Roughness')
gui.add(material, 'aoMapIntensity').min(0).max(10).step(0.0001).name('aoMapIntensity')
gui.add(material, 'displacementScale').min(0).max(1).step(0.0001).name('displacementScale')

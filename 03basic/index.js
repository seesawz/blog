//创建场景
const t = THREE
const scene = new t.Scene()
//创建正方体
const geometry = new t.BoxGeometry(1, 1, 1)
//创建材质
const material = new t.MeshBasicMaterial({ color: 0xff0000 })

const mesh = new t.Mesh(geometry, material)
scene.add(mesh)

//camera
const size = {
  width: 800,
  height: 600,
}

const camera = new t.PerspectiveCamera(75, size.width / size.height)
scene.add(camera)
camera.position.z = 3
camera.position.x = 2
//Renderer
const canvas = document.querySelector('.webgl')
const renderer = new t.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(size.width, size.height)

renderer.render(scene, camera)

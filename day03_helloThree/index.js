let scene, renderer, camera
let cube

// 初始化場景、渲染器、相機、物體
function init() {
  // 建立場景
  scene = new THREE.Scene()

  // 建立渲染器
  renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight) // 場景大小
  renderer.setClearColor(0xeeeeee, 1.0) // 預設背景顏色
  renderer.shadowMap.enable = true // 陰影效果

  // 將渲染器的 DOM 綁到網頁上
  document.body.appendChild(renderer.domElement)

  // 建立相機
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  )
  camera.position.set(10, 10, 10)
  camera.lookAt(scene.position)

  // 建立光源
  let pointLight = new THREE.PointLight(0xffffff)
  pointLight.position.set(10, 10, -10)
  scene.add(pointLight)

  // 建立物體
  const geometry = new THREE.BoxGeometry(1, 1, 1) // 幾何體
  const material = new THREE.MeshPhongMaterial({
    color: 0x0000ff
  }) // 材質
  cube = new THREE.Mesh(geometry, material) // 建立網格物件
  cube.position.set(0, 0, 0)
  scene.add(cube)
}

// 建立動畫
function animate() {
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01
}

// 渲染場景
function render() {
  animate()
  requestAnimationFrame(render)
  renderer.render(scene, camera)
}

// 監聽螢幕寬高來做簡單 RWD 設定
// （resize）。當瀏覽器視窗大小變更時，相機的畫面比例（aspect）也會跟著改變
// 然後更新相機的投影矩陣（projection matrix），最後重新設定渲染器（renderer）的大小以符合新的視窗大小。
// 當畫面比例改變時，相機的投影矩陣也需要重新計算以保持正確的投影效果，這時可以呼叫 camera.updateProjectionMatrix() 方法來完成這個過程。

window.addEventListener('resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})



init()
render()

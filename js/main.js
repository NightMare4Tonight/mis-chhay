// Find the latest version by visiting https://unpkg.com/three.
// import gsap from "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.2.3/gsap.js"
import * as THREE from "https://unpkg.com/three@0.127.0/build/three.module.js"
import { OrbitControls } from "https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js"
// import * as dat from "dat.gui"

//function for going to a new page
function nextPage() {
  // setTimeout(200)
  window.location.href = "./sub-site/home.html"
}

//initializing a gui
// const gui = new dat.GUI()
const world = {
  plane: {
    width: 400,
    height: 400,
    widthSegments: 50,
    heightSegments: 50,
  },
}

//adding the gui in, we can disable it after we finalized what we want
// gui.add(world.plane, "width", 1, 500).onChange(generatePlane)
// gui.add(world.plane, "height", 1, 500).onChange(generatePlane)
// gui.add(world.plane, "widthSegments", 1, 100).onChange(generatePlane)
// gui.add(world.plane, "heightSegments", 1, 100).onChange(generatePlane)

//generate the field/plane
function generatePlane() {
  //dispose the old one
  planeMesh.geometry.dispose()

  //generating the new plane
  planeMesh.geometry = new THREE.PlaneGeometry(
    world.plane.width,
    world.plane.height,
    world.plane.widthSegments,
    world.plane.heightSegments
  )

  // vertice position randomization
  const { array } = planeMesh.geometry.attributes.position
  const randomValues = []
  for (let i = 0; i < array.length; i++) {
    if (i % 3 === 0) {
      const x = array[i]
      const y = array[i + 1]
      const z = array[i + 2]

      array[i] = x + (Math.random() - 0.5) * 3
      array[i + 1] = y + (Math.random() - 0.5) * 3
      array[i + 2] = z + (Math.random() - 0.5) * 3
    }

    randomValues.push(Math.random() * Math.PI * 2)
  }

  planeMesh.geometry.attributes.position.randomValues = randomValues
  planeMesh.geometry.attributes.position.originalPosition =
    planeMesh.geometry.attributes.position.array

  //adding in the color
  const colors = []
  for (let i = 0; i < planeMesh.geometry.attributes.position.count; i++) {
    colors.push(0, 0.19, 0.4)
  }

  planeMesh.geometry.setAttribute(
    "color",
    new THREE.BufferAttribute(new Float32Array(colors), 3)
  )
}

//raycaster is like a lazer that tell use where we are at on the object
const raycaster = new THREE.Raycaster()

//initialize the scene
const scene = new THREE.Scene()

//initailize our camera
const camera = new THREE.PerspectiveCamera(
  75,
  innerWidth / innerHeight,
  0.1,
  1000
)

//rendering the plane
const renderer = new THREE.WebGLRenderer()

//setting the size
renderer.setSize(innerWidth, innerHeight)

//setting the user pixel
renderer.setPixelRatio(devicePixelRatio)

//adding the plane into our body
document.body.appendChild(renderer.domElement)

//adding in the ability to control the plane
// new OrbitControls(camera, renderer.domElement)
camera.position.z = 65

//initialize the plane with the value that we declare with the gui
const planeGeometry = new THREE.PlaneGeometry(
  world.plane.width,
  world.plane.height,
  world.plane.widthSegments,
  world.plane.heightSegments
)

//telling the js what kind of material we want to use for more info visit their main site
const planeMaterial = new THREE.MeshPhongMaterial({
  side: THREE.DoubleSide,
  flatShading: THREE.FlatShading,
  vertexColors: true,
})

//creating a mesh that has the plane geometry and the material
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial)

//adding in the plane
scene.add(planeMesh)

//generating in the plane
generatePlane()

//adding in light position 1
const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(0, -1, 1)
scene.add(light)

//adding in light for position 2 at the back
const backLight = new THREE.DirectionalLight(0xffffff, 1)
backLight.position.set(0, 0, -1)
scene.add(backLight)

//new geo
const starGeometry = new THREE.BufferGeometry()
const starMaterial = new THREE.PointsMaterial({ color: 0xffffff })

const starVerticies = []
for (let i = 0; i < 10000; i++) {
  const x = (Math.random() - 0.5) * 2000
  const y = (Math.random() - 0.5) * 2000
  const z = (Math.random() - 0.5) * 2000

  starVerticies.push(x, y, z)
}

starGeometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(starVerticies, 3)
)

const stars = new THREE.Points(starGeometry, starMaterial)

scene.add(stars)

//declaring th emouse position
const mouse = {
  x: undefined,
  y: undefined,
}

//initializing the animation and frame
let frame = 0
function animate() {
  //animation
  requestAnimationFrame(animate)

  //rendering in the scene and the camera
  renderer.render(scene, camera)

  //calling the raycase to set where the lazer is
  raycaster.setFromCamera(mouse, camera)

  //telling the frame to move every 0.01
  frame += 0.01

  const {
    array,
    originalPosition,
    randomValues,
  } = planeMesh.geometry.attributes.position

  //looping the moving x, y, z position
  for (let i = 0; i < array.length; i += 3) {
    // x pos
    array[i] = originalPosition[i] + Math.cos(frame + randomValues[i]) * 0.01

    // y pos
    array[i + 1] =
      originalPosition[i + 1] + Math.sin(frame + randomValues[i + 1]) * 0.001
  }

  //telling that we need to update the things after we done modifying it
  planeMesh.geometry.attributes.position.needsUpdate = true

  //creating an interesect when our lazer/raycast is on the plane
  const intersects = raycaster.intersectObject(planeMesh)
  if (intersects.length > 0) {
    const { color } = intersects[0].object.geometry.attributes

    //for changing the color when we hover on the object
    // vertice 1
    color.setX(intersects[0].face.a, 0.1)
    color.setY(intersects[0].face.a, 0.5)
    color.setZ(intersects[0].face.a, 1)

    // vertice 2
    color.setX(intersects[0].face.b, 0.1)
    color.setY(intersects[0].face.b, 0.5)
    color.setZ(intersects[0].face.b, 1)

    // vertice 3
    color.setX(intersects[0].face.c, 0.1)
    color.setY(intersects[0].face.c, 0.5)
    color.setZ(intersects[0].face.c, 1)

    //update after the color change
    intersects[0].object.geometry.attributes.color.needsUpdate = true

    const initialColor = {
      r: 0,
      g: 0.19,
      b: 0.4,
    }

    const hoverColor = {
      r: 0.1,
      g: 0.5,
      b: 1,
    }

    //animate the color to disappear after
    gsap.to(hoverColor, {
      r: initialColor.r,
      g: initialColor.g,
      b: initialColor.b,
      duration: 1,
      onUpdate: () => {
        // vertice 1
        color.setX(intersects[0].face.a, hoverColor.r)
        color.setY(intersects[0].face.a, hoverColor.g)
        color.setZ(intersects[0].face.a, hoverColor.b)

        // vertice 2
        color.setX(intersects[0].face.b, hoverColor.r)
        color.setY(intersects[0].face.b, hoverColor.g)
        color.setZ(intersects[0].face.b, hoverColor.b)

        // vertice 3
        color.setX(intersects[0].face.c, hoverColor.r)
        color.setY(intersects[0].face.c, hoverColor.g)
        color.setZ(intersects[0].face.c, hoverColor.b)

        //updating the color
        color.needsUpdate = true
      },
    })
  }

  stars.rotation.x += 0.00025
}

//call the function to start
animate()

//mouse move the event happens
addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / innerWidth) * 2 - 1
  mouse.y = -(event.clientY / innerHeight) * 2 + 1
})

gsap.to("#title-name", {
  opacity: 1,
  duration: 1.75,
  ease: "expo",
})
gsap.to("#title-des", {
  opacity: 1,
  duration: 1.75,
  delay: 0.4,
  ease: "expo",
})
gsap.to("#title-ref", {
  opacity: 1,
  duration: 1.75,
  delay: 0.8,
  ease: "expo",
})

document.querySelector("#title-ref").addEventListener("click", (e) => {
  e.preventDefault()
  gsap.to("#main-container", {
    opacity: 0,
  })

  gsap.to(camera.position, {
    z: 25,
    ease: "expo.inOut",
    duration: 2,
  })

  gsap.to(camera.rotation, {
    x: 1.57,
    ease: "expo.inOut",
    duration: 2,
  })

  gsap.to(camera.position, {
    y: 1000,
    ease: "expo.in",
    duration: 2,
    delay: 1.85,
    onComplete: () => {
      nextPage()
    },
  })
})

addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight
  camera.updateProjectionMatrix()

  render.setSize(innerWidth, innerHeight)
})

import * as THREE from 'three'
import Experience from '../Experience.js'
import gsap from 'gsap'
import vertexShader from './../shaders/vertex.glsl'
import fragmentShader from './../shaders/fragment.glsl'

export default class Plane {
    constructor(img, width, height, position, title, description, mobilePosition, isMobile) {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.renderer = this.experience.renderer
        this.raycaster = this.experience.raycaster
        this.setGeometry(width, height)
        this.setMaterial(img)
        this.setMesh(position, title, description, mobilePosition, isMobile)
        // this.clock = new THREE.Clock()
        // Debug
        // this.debug = this.experience.debug
        // console.log(this.debug)
        // if(this.debug.active) {
        //     this.debugFolder = this.debug.ui.addFolder('planes')
        // }
    }

    setGeometry(width, height) {
        this.geometry = new THREE.PlaneGeometry(width, height)
        // const count = this.geometry.attributes.position.count
        // const randoms = new Float32Array(count)

        // for(let i = 0; i < count; i++) {
        //     randoms[i] = Math.random()
        // }

        // this.geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1))
    }

    setMaterial(img) {
        const texture = this.resources.items[img]
        // texture.anisotropy = this.renderer.instance.capabilities.getMaxAnisotropy()
        this.material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide
        })
        // this.material = new THREE.ShaderMaterial({
        //     vertexShader: vertexShader,
        //     fragmentShader: fragmentShader,
        //     uniforms: {
        //         uFrequency: { value: new THREE.Vector2(10, 5) },
        //         uTime: { value: 0 },
        //         uColor: { value: new THREE.Color('green') },
        //         uTexture: { value: texture }
        //     }
        // })
        this.material.side = THREE.DoubleSide
        // // Debug
        // if(this.debug.active) {
        //     this.debugFolder.add(this.material.uniforms.uFrequency.value, 'x').min(0).max(20).step(0.01).name('frequencyX')
        //     this.debugFolder.add(this.material.uniforms.uFrequency.value, 'y').min(0).max(20).step(0.01).name('frequencyY')
        // }
    }

    setMesh(position, title, description, mobilePosition, isMobile) {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        if(isMobile){
            this.mesh.position.set(mobilePosition.x, mobilePosition.y, mobilePosition.z)
        } else {
            this.mesh.position.set(position.x, position.y, position.z)
        }
        this.mesh.name = 'portfolio'
        this.mesh.userData.title = title
        this.mesh.userData.description = description
        this.mesh.userData.position = position
        this.mesh.userData.isMobile = isMobile
        this.mesh.userData.mobilePosition = mobilePosition
        this.raycaster.objectsToTest.push(this.mesh)
        this.scene.add(this.mesh)
    }

    update() {
        // const elapsedTime = this.clock.getElapsedTime()
        // this.material.uniforms.uTime.value = elapsedTime
    }
}
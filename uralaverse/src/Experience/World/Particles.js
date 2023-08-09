import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Particles {
    constructor(amount) {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.setGeometry()
        this.setTexture()
        this.setMaterial()
        this.setMesh(amount)
    }

    setGeometry() {
        this.geometry = new THREE.BufferGeometry()
    }

    setTexture() {
        this.texture = this.resources.items.particles
    }

    setMaterial() {
        this.material = new THREE.PointsMaterial({
            size: 0.1,
            sizeAttenuation: true,
            // color: '#f7f1aa',
            map: this.texture,
            alphaMap: this.texture,
            transparent: true,
            // alphaTest: 0.5
            // depthTest: false
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true
        })
    }

    setMesh(amount) {
        const positions = new Float32Array(amount * 3)
        const colors = new Float32Array(amount * 3)

        for(let i = 0; i < amount * 3; i++){
            positions[i] = (Math.random() - 0.5) * 20
            colors[i] = Math.random()
        }

        this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        this.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

        const particles = new THREE.Points(this.geometry, this.material)
        this.scene.add(particles)
    }
}
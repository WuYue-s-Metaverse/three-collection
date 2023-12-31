import * as THREE from 'three';

// Create a Cube with its faces colored a specific way based on which direction/axis it faces.
// The Main bits are RED:FORWARD(+Z), GREEN:LEFT(+X), BLUE:TOP(+Y)
export default function facedCube( pos=null, scl=null ){
    const geo = new THREE.BoxGeometry( 1, 1, 1 );
    const mat = [
        new THREE.MeshBasicMaterial( { color: 0x00ff00 } ), // Left
        new THREE.MeshBasicMaterial( { color: 0x777777 } ), // Right
        new THREE.MeshBasicMaterial( { color: 0x0000ff } ), // Top
        new THREE.MeshBasicMaterial( { color: 0x222222 } ), // Bottom
        new THREE.MeshBasicMaterial( { color: 0xff0000 } ), // Forward
        new THREE.MeshBasicMaterial( { color: 0xffffff } ), // Back
    ];

    const mesh = new THREE.Mesh( geo, mat );
    
    if( pos )			mesh.position.fromArray( pos );
    if( scl != null )	mesh.scale.set( scl, scl, scl );

    return mesh; 
}
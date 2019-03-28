var camera, scene, renderer;

init();
animate();

function init() {
var textureValue = document.getElementById("texture").value; 
console.log(textureValue)
  // Main Scene ===================
  texture = new THREE.TextureLoader().load( textureValue + '-min.jpg' );
  texture.mapping = THREE.UVMapping;

  // Camera
  camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.set( 0, 0, 2 );


  // Scene
  scene = new THREE.Scene();

  // Background
  backgroundMesh = new THREE.Mesh( new THREE.SphereBufferGeometry( 500, 32, 16 ), new THREE.MeshBasicMaterial( { map: texture } ) );
  backgroundMesh.geometry.scale( - 1, 1, 1 );
  scene.add( backgroundMesh );

  // Renderer
  renderer = new THREE.WebGLRenderer({ canvas:document.getElementById('main'), antialiasing:true });        
  renderer.setPixelRatio( window.devicePixelRatio );

  renderer.setSize( window.innerWidth, window.innerHeight );

  // Controls
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // For that slippery Feeling
  controls.dampingFactor = 0.1; // Needs to call update on render loop 
  controls.rotateSpeed = 0.08; // Rotate speed
  controls.enableZoom = false


  renderer.autoClear = false;

  window.addEventListener( 'resize', onWindowResized, false );
}

function onWindowResized() {
  renderer.setSize( window.innerWidth, window.innerHeight );
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}



function animate() {
  requestAnimationFrame( animate );
  controls.update();
  render();
}

function render() {
  camera.lookAt( scene.position );
  renderer.clear();
  renderer.setViewport( 0, 0, window.innerWidth, window.innerHeight );
  renderer.render( scene, camera );

}
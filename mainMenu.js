const mainMenu = document.getElementById('mainMenu');
const mainGame2 = document.getElementById('mainGame');
const start = document.getElementById('start');
let mixerMenu;
let mixerMenu2;
let clockMenu = new THREE.Clock();
let mainMenuRendering;

const sceneMenu = new THREE.Scene();
const cameraMenu = new THREE.PerspectiveCamera();
cameraMenu.position.set(0, 0, 20);
const rendererMenu = new THREE.WebGLRenderer({
  antialias: true,
  shadowMapEnabled: true
});
rendererMenu.setSize(1000, 600);
rendererMenu.shadowMap.enabled = true;
rendererMenu.shadowMap.type = THREE.PCFSoftShadowMap;
mainMenu.appendChild(rendererMenu.domElement);

const loaderMenu = new THREE.ColladaLoader();
const textureLoaderMenu = new THREE.TextureLoader();

let materialArrayMenu = [];
let texture_ftMenu = textureLoaderMenu.load('/textures/skybox/heather_ft.jpg');
let texture_bkMenu = textureLoaderMenu.load('/textures/skybox/heather_bk.jpg');
let texture_upMenu = textureLoaderMenu.load('/textures/skybox/heather_up.jpg');
let texture_dnMenu = textureLoaderMenu.load('/textures/skybox/heather_dn.jpg');
let texture_rtMenu = textureLoaderMenu.load('/textures/skybox/heather_rt.jpg');
let texture_lfMenu = textureLoaderMenu.load('/textures/skybox/heather_lf.jpg');

materialArrayMenu.push(new THREE.MeshBasicMaterial({ map: texture_ftMenu }));
materialArrayMenu.push(new THREE.MeshBasicMaterial({ map: texture_bkMenu }));
materialArrayMenu.push(new THREE.MeshBasicMaterial({ map: texture_upMenu }));
materialArrayMenu.push(new THREE.MeshBasicMaterial({ map: texture_dnMenu }));
materialArrayMenu.push(new THREE.MeshBasicMaterial({ map: texture_rtMenu }));
materialArrayMenu.push(new THREE.MeshBasicMaterial({ map: texture_lfMenu }));

for (let i = 0; i < 6; i++) materialArrayMenu[i].side = THREE.BackSide;

let skyboxGeoMenu = new THREE.BoxGeometry(500, 500, 500);
let skyboxMenu = new THREE.Mesh(skyboxGeoMenu, materialArrayMenu);

sceneMenu.add(skyboxMenu);
const ambientMenu = new THREE.AmbientLight(0xffffff, 0.8);
const directionalLightMenu = new THREE.DirectionalLight(0x404040);
directionalLightMenu.castShadow = true;
directionalLightMenu.shadow.camera.near = 0.0001;
directionalLightMenu.shadow.camera.far = 40;
var d = 100;
directionalLightMenu.shadow.camera.right = d;
directionalLightMenu.shadow.camera.left = -d;
directionalLightMenu.shadow.camera.top = d;
directionalLightMenu.shadow.camera.bottom = -d;
directionalLightMenu.shadow.mapSize.width = 2048;
directionalLightMenu.shadow.mapSize.height = 2048;
directionalLightMenu.shadow.radius = 4;
directionalLightMenu.shadow.bias = -0.0005;
directionalLightMenu.position.y = 20;
directionalLightMenu.position.z = 0;
directionalLightMenu.position.x = 0;

sceneMenu.add(directionalLightMenu);
sceneMenu.add(ambientMenu);
loaderMenu.load('./models/stormtrooper.dae', colladaMenu => {
  let avatarMenu = colladaMenu.scene;
  const animationsMenu = colladaMenu.animations;
  avatarMenu.traverse(function(node) {
    if (node.isSkinnedMesh) {
      node.frustumCulled = false;
    }
    node.castShadow = true;
    node.receiveShadow = true;
  });
  avatarMenu.position.set(-0.2, -2.2, 0);
  avatarMenu.scale.set(1, 1, 1);
  avatarMenu.rotation.x = 90;
  mixerMenu = new THREE.AnimationMixer(avatarMenu);
  mixerMenu.clipAction(animationsMenu[0]).play();
  sceneMenu.add(avatarMenu);
});
loaderMenu.load('./models/stormtrooper.dae', colladaMenu => {
  let avatarMenu2 = colladaMenu.scene;
  const animationsMenu2 = colladaMenu.animations;
  avatarMenu2.traverse(function(node) {
    if (node.isSkinnedMesh) {
      node.frustumCulled = false;
    }
    node.castShadow = true;
    node.receiveShadow = true;
  });
  avatarMenu2.position.set(-3.2, -3, 10);
  avatarMenu2.scale.set(1, 1, 1);
  avatarMenu2.rotation.z = 10;
  mixerMenu2 = new THREE.AnimationMixer(avatarMenu2);
  mixerMenu2.clipAction(animationsMenu2[0]).play();
  sceneMenu.add(avatarMenu2);
});
loaderMenu.load('./models/stormtrooper.dae', colladaMenu => {
  let avatarMenu3 = colladaMenu.scene;
  const animationsMenu3 = colladaMenu.animations;
  avatarMenu3.traverse(function(node) {
    if (node.isSkinnedMesh) {
      node.frustumCulled = false;
    }
    node.castShadow = true;
    node.receiveShadow = true;
  });
  avatarMenu3.position.set(2.5, -3, 10);
  avatarMenu3.scale.set(1, 1, 1);
  avatarMenu3.rotation.z = -10;
  mixerMenu3 = new THREE.AnimationMixer(avatarMenu3);
  mixerMenu3.clipAction(animationsMenu3[0]).play();
  sceneMenu.add(avatarMenu3);
});
renderMenu();
start.addEventListener('click', function() {
  cancelAnimationFrame(mainMenuRendering);
  mainGame2.style.display = 'block';
  mainMenu.style.display = 'none';
});
function renderMenu() {
  mainMenuRendering = requestAnimationFrame(renderMenu);
  var deltaMenu = clockMenu.getDelta();
  rendererMenu.render(sceneMenu, cameraMenu);
  if (mixerMenu !== undefined) {
    mixerMenu.update(deltaMenu);
    mixerMenu2.update(deltaMenu);
    mixerMenu3.update(deltaMenu);
  }
}

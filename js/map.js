let scene, renderer, camera, domEvents; 
let manager = new THREE.LoadingManager();
const loader = new THREE.TextureLoader(manager);
//CAMERA VARIABLES
const fov = 75;
let camStart = {x:-150, y:2050, z:0}; 
// let camStart = {x:-150, y:100, z:0}; 
let camMain = {x:-100, y:140, z:10}; 
//OBJECT VARIABLES
var clouds = [];
var seas =[]; 
let chapel, skyscrapper, mural, beach, playground; 
let hist, geo, com, ada, park; 
let ground, map,medBLue,litBlue, groupSea,mapGroup, eggs; 
//INTERACTIVE
let eggTween= []; 
let lowerFog = false; 
let zRotation; 
//DOM ELEMENTS
const canvas = document.getElementById("myCanvas");
var loadLine = document.getElementById("loadLine"); 
var num = document.getElementById("num");
var labels = document.getElementById("labels");
var load = document.getElementById("loading"); 
var titles = document.querySelectorAll(".title"); 

// function mapWindow(input, in_min, in_max, out_min, out_max) {
//   return (input - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
// }
Number.prototype.map = function (in_min, in_max, out_min, out_max) {
  return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

manager.onLoad = function ( ) {
  console.log('Loading Complete!');
  load.classList.add('fadeAway');
  lowerFog =true; 
  let windowRatio =window.innerWidth/window.innerHeight; 
  console.log(windowRatio); 
  zRotation = windowRatio.map(.9, 4, .000080,.000005); 
  clouds.forEach(cloud =>{
    let newcloudPos;
    let ran = Math.random(); 
    if(cloud.position.x>0){
      newcloudPos = new THREE.Vector3( cloud.position.x+ Math.random()*canvas.clientWidth*2 +canvas.clientWidth*.5 , cloud.position.y,  cloud.position.z+Math.random()*( -canvas.clientHeight*2)-canvas.clientHeight*.5);
    }
    else{
      newcloudPos = new THREE.Vector3(cloud.position.x+Math.random()*(-canvas.clientWidth*3)-canvas.clientWidth*.5 , cloud.position.y,  cloud.position.z+Math.random()*canvas.clientHeight*2+canvas.clientHeight*.5); 
    }
    new TWEEN.Tween(cloud.position).to( newcloudPos, 5000 ).delay(2000) 
    .easing(TWEEN.Easing.Quadratic.InOut).onComplete(()=>{
      labels.style="display:block";  
      cameraBegin(camera); 
    }).start();
  })
};
manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
	console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
};
manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
	console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
  loadLine.style.width = (itemsLoaded / itemsTotal * 100) + '%';
  let number =(itemsLoaded / itemsTotal * 100).toString(); 
  num.innerHTML=number; 
};
window.addEventListener("load", loadScreen);
function loadScreen(){
    basicScene(); 
    makeClouds(); 
    basePlane()
    makeMapElements(); 
    animate();
}
window.addEventListener( 'resize', onWindowResize );

function animate(time) {
if(lowerFog ==true && scene.fog.density>0){
  scene.fog.density-=(.000005); 
}
groupSea.position.x+=.04; 
  requestAnimationFrame(animate);
  TWEEN.update(time); 
  renderer.render(scene, camera);
}
function basicScene(){
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true,
      });
      renderer.setClearColor(0xefd1b5, 0);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      //SCENE
      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0xefd1b5, 0.0010);
      //CAMERA
      camera = new THREE.PerspectiveCamera(
        fov,
        canvas.clientWidth / canvas.clientHeight,
        1,
        10000
      );
      camera.lookAt(scene.position);
      camera.position.set(camStart.x, camStart.y, camStart.z);
      camera.rotation.x = -90 * (Math.PI / 180);
      //FIRST CAMERA STARTING ROTATION
      camera.rotation.z =  55 * (Math.PI / 180);
        //LIGHTS
        var hemLight = new THREE.HemisphereLight(0xFFFFFF, 0x0808dd, 1);
        scene.add(hemLight); 
        //DOMEVENTS
        domEvents = new THREEx.DomEvents(camera, renderer.domElement); 
     
}
function makeClouds(){
    const cloud =  new THREE.TextureLoader().load("../illustrations/cloudS.PNG");
    for (let i = 0; i < 100; i++) {
      const object = new THREE.Sprite(new THREE.SpriteMaterial({ map: cloud }));
      object.position.x = Math.random() *canvas.clientWidth*2  -  canvas.clientWidth;
        //height up 
      object.position.y = Math.random() * 1300 + 150;
      object.position.z = Math.random() *canvas.clientHeight*2  - canvas.clientHeight;
       let scale = Math.random() * 200 + 200;
      object.scale.x = 3*scale
      object.scale.y = 1.63*scale; 
      object.rotation.z = -1*  55 * (Math.PI / 180);
      clouds[i] = object;
      scene.add(object);
    }
    // makeMapElements(); 
    return clouds; 
  }
  function basePlane(){
      //BLUE BASE WATER
    var planeGeometry2 = new THREE.PlaneGeometry(10000, 10000, 100, 100);
    var planeMaterial2= new THREE.MeshStandardMaterial({
      color: 0x3290b1,
      transparecy: true,
      side: THREE.DoubleSide,
      depthWrite: true,
      opacity: 1,
    });
     ground1 = new THREE.Mesh(planeGeometry2, planeMaterial2);
    ground1.rotation.x = -90 * (Math.PI / 180);
    ground1.position.y = -40;
    scene.add(ground1);
  }
  function onWindowResize() {
    const width =  window.innerWidth; 
    const height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }
  function makeMapElements(){
    //ADD BAY AREA LAND 
    let landT = loader.load("../illustrations/landMass.png"); 
    var planeGeometry3 = new THREE.PlaneGeometry(6750.4,3179.2, 100, 100);
    var planeMaterial3= new THREE.MeshStandardMaterial({
      map: landT,
      transparent: true,
      depthWrite: true,
    });
     landMass = new THREE.Mesh(planeGeometry3, planeMaterial3);
     landMass.rotation.x = -90 * (Math.PI / 180);
     landMass.rotation.z =  55 * (Math.PI / 180);
     landMass.position.set(360, -5, -750);
    scene.add(landMass);
//WATER TEXTURES
    const mediumBLue = loader.load("../textures/waterTextured.png");
    let waterWidth = 1000; 
    let waterHeight = 1250; 
          const planeGeometry1 = new THREE.PlaneGeometry(waterWidth, waterHeight);
          const planeMaterial1 = new THREE.MeshStandardMaterial({
            map: mediumBLue,
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false
          });
    let rows = 8; 
    let columns =4; 
    groupSea = new THREE.Group();
    for(let j=0; j<columns; j++){
          for(let i=0; i<rows; i++){
            const seaPanel = new THREE.Mesh(planeGeometry1, planeMaterial1);
            seaPanel.position.set(waterWidth*i,-10, -waterHeight*j)
              seaPanel.rotation.x = -90 * (Math.PI / 180);
              groupSea.add(seaPanel); 
          }
        }
          scene.add(groupSea);
          groupSea.rotation.y = -180 * (Math.PI / 180);
          groupSea.position.z-=2000; 
          groupSea.position.x+=2000; 

//ADD THE BASE MAP 
          let mapT = loader.load("../illustrations/MainBaseMap.png"); 
          var planeGeometry = new THREE.PlaneGeometry(530.82, 600);
          var planeMaterial = new THREE.MeshStandardMaterial({
          map: mapT,
          transparent: true,
          side: THREE.DoubleSide,
          depthWrite: false
          });
          map = new THREE.Mesh(planeGeometry, planeMaterial);
          map.rotation.x = -90 * (Math.PI / 180);
          mapGroup = new THREE.Group();
          mapGroup.add(map);
      //ADD EASTER EGGS
      //Navy Church
          let navyChurchT = loader.load("../illustrations/navyCh.png")
          var nGeo = new THREE.PlaneGeometry(27.625,25);
          var nPlane = new THREE.MeshStandardMaterial({
            map: navyChurchT,
            transparent: true,
            depthWrite: false
            });
           chapel = new THREE.Mesh(nGeo, nPlane);
          chapel.position.set(-108,-43, 0); 
      //Playground
          let playgroundT = loader.load("../illustrations/playground.png")
          var pGeo = new THREE.PlaneGeometry(34.56,19.44);
          var pPlane = new THREE.MeshStandardMaterial({
            map: playgroundT,
            transparent: true,
            depthWrite: false
            });
          playground = new THREE.Mesh(pGeo, pPlane);
          playground.position.set(-144,10, 0); 
        //Skyscrapper
        let skyScrT = loader.load("../illustrations/skyscrapper.png")
        var sGeo = new THREE.PlaneGeometry(19.76, 30);
        var sPlane = new THREE.MeshStandardMaterial({
          map: skyScrT,
          transparent: true,
          depthWrite: false
          });
        skyscrapper = new THREE.Mesh(sGeo, sPlane);
        skyscrapper.position.set(-105,-4, 0); 
         //Beach
         let beachT = loader.load("../illustrations/beach.png")
         var bGeo = new THREE.PlaneGeometry(41.424, 28.8);
         var bPlane = new THREE.MeshStandardMaterial({
           map:  beachT,
           transparent: true,
           depthWrite: false
           });
         beach = new THREE.Mesh(bGeo, bPlane);
         beach.position.set(-193,-48, 0); 
          //Mural
          let muralT = loader.load("../illustrations/mural.png")
          var mGeo = new THREE.PlaneGeometry(40, 22.5);
          var mPlane = new THREE.MeshStandardMaterial({
            map: muralT,
            transparent: true,
            depthWrite: false
            });
          mural = new THREE.Mesh(mGeo, mPlane);
          mural.position.set(-170,35, 0); 
  //EGGS GROUP
          eggs=new THREE.Group();
          eggs.add(chapel); 
          eggs.add(playground); 
          eggs.add(skyscrapper); 
          eggs.add(beach); 
          eggs.add(mural); 
          eggs.rotation.x = -90 * (Math.PI / 180);
          eggs.position.y = 3;
          scene.add(eggs); 
          scene.add(map);
  }
  function cameraBegin(camera){
  let counter =0; 
  titles.forEach(title=>{
title.classList.add("fadeAway2"); 
  }); 
    let coords = new THREE.Vector3(camMain.x, camMain.y, camMain.z);
    var tween = new TWEEN.Tween(camera.position)
    .to(coords, 5000).delay(2000) 
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate(()=>{
      counter++; 
      if(camera.rotation.z>=0){
   camera.rotation.z -=zRotation *counter* (Math.PI / 180); 
      }
    })
    .onComplete(() =>{
      clouds.forEach(cloud=>{scene.remove(cloud)}); 
     jumpEggs();  
     mainMapView(); 
    })
    .start();
  }
  function jumpEggs(){
    let jump= []; 
    jump[0] = -1; 
    jump[1] = .8; 
    jump[2] = .9; 
    jump[3] = -1.4; 
    jump[4] = -1.2; 
    let timeF= []; 
    timeF[0] = 700; 
    timeF[1] = 800; 
    timeF[2] = 700; 
    timeF[3] = 900; 
    timeF[4] = 800; 
    eggs.children.forEach((egg, index)=> {
      let move = new THREE.Vector3(egg.position.x,egg.position.y + jump[index],egg.position.z )
            eggTween[index] =  new TWEEN.Tween(egg.position).to(move, timeF[index])
          .easing(TWEEN.Easing.Quadratic.InOut).repeat(Infinity).yoyo(true).start() 
     }); 
  }
  function mainMapView(){
scene.remove(clouds); 
scene.remove(landMass); 

  }; 
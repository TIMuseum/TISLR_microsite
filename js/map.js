let scene, renderer, camera, domEvents; 
let manager = new THREE.LoadingManager();
const loader = new THREE.TextureLoader(manager);
//CAMERA VARIABLES
const fov = 75;
let camStart = {x:-150, y:2050, z:0}; 
// let camStart = {x:-150, y:200, z:0}; 
let camMain = {x:-100, y:140, z:10}; 
//OBJECT VARIABLES
var clouds = [];
var seas =[]; 
let chapel, skyscrapper, mural, beach; 
let subPortalObj= []; 
let BLD1, BLD2, BLD3, Nimitz, YBL, Torp; 
let contam, urbanDes, soilD; 
let environStew, publicServ, facil; 
let wetlands,adaPer, pervious, waterManag; 
let ground, map,medBLue,litBlue, groupSea,mapGroup, eggs; 
//INTERACTIVE
let eggTween= []; 
let lowerFog = false; 
let zRotation; 
let notAtzero =false;
let zoomPositions =[]; 
let currentPortal; 
//DOM ELEMENTS
const canvas = document.getElementById("myCanvas");
var loadLine = document.getElementById("loadLine"); 
var num = document.getElementById("num");
var load = document.getElementById("loading"); 
var titles = document.querySelectorAll(".title"); 
var introPopups = document.querySelectorAll('.popUp.intro'); 
var allPopUps = document.querySelectorAll('.popUp'); 
var mainMapBtn = document.getElementById("mainMapBtn");
var subPortalPopUps = document.querySelectorAll('.subPortalPopUp'); 
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
  zRotation = windowRatio.map(.75, 4, .000020,.000001); 
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
      cameraBegin(camera); 
    }).start();
  })
};
manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
	// console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
};
manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
	// console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
  loadLine.style.width = (itemsLoaded / itemsTotal * 100) + '%';
  let number =(Math.round(itemsLoaded / itemsTotal * 100)).toString(); 
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
if(notAtzero ==true && camera.rotation.z>0){
  // console.log("not there yet")
  camera.rotation.z -=.0008; 
};
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
    let waterWidth = 800; 
    let waterHeight = 1000; 
          const planeGeometry1 = new THREE.PlaneGeometry(waterWidth, waterHeight);
          const planeMaterial1 = new THREE.MeshStandardMaterial({
            map: mediumBLue,
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false
          });
    let rows = 10; 
    let columns =7; 
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
          groupSea.rotation.y = -150 * (Math.PI / 180);
          groupSea.position.z-=1900; 
          groupSea.position.x+=1800; 

      //ADD THE BASE MAP 
          let mapT = loader.load("../illustrations/mapBaseBridge.png"); 
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
          var nGeo = new THREE.PlaneGeometry(33.15,28.8);
          var nPlane = new THREE.MeshStandardMaterial({
            map: navyChurchT,
            transparent: true,
            depthWrite: false
            });
           chapel = new THREE.Mesh(nGeo, nPlane);
           chapel.position.set(-118,0, 40); 
        //Skyscrapper
        let skyScrT = loader.load("../illustrations/skyscrapper.png")
        var sGeo = new THREE.PlaneGeometry(19.76, 30);
        var sPlane = new THREE.MeshStandardMaterial({
          map: skyScrT,
          transparent: true,
          depthWrite: false
          });
        skyscrapper = new THREE.Mesh(sGeo, sPlane);
        skyscrapper.position.set(-105,0, 0); 
         //Beach
         let beachT = loader.load("../illustrations/beach.png")
         var bGeo = new THREE.PlaneGeometry(41.424, 28.8);
         var bPlane = new THREE.MeshStandardMaterial({
           map:  beachT,
           transparent: true,
           depthWrite: false
           });
         beach = new THREE.Mesh(bGeo, bPlane);
         beach.position.set(-193,0, 48); 
          //Mural
          let muralT = loader.load("../illustrations/mural.png")
          var mGeo = new THREE.PlaneGeometry(40, 22.5);
          var mPlane = new THREE.MeshStandardMaterial({
            map: muralT,
            transparent: true,
            depthWrite: false
            });
          mural = new THREE.Mesh(mGeo, mPlane);
          mural.position.set(-150,0, -30); 
      //EGGS GROUP
          eggs= [chapel, skyscrapper, beach, mural];
          eggs.forEach(egg=>{
            egg.rotation.x = -90 * (Math.PI / 180);
            egg.position.y = 3;
            scene.add(egg); 
          }); 
          scene.add(map);
          camera.rotation.x = -90 * (Math.PI / 180);
          // set the position to zoom for each main egg
          zoomPositions[0] ={x:-20,y:100,z:40}; 
          zoomPositions[1] ={x:-138,y:100,z:40}; 
          zoomPositions[2] ={x:-138,y:100,z:40}; 
          zoomPositions[3] ={x:-138,y:100,z:40};
          history()
          watchEvents(); 
  }
  function history(){
      //BLD1
      let BLD1T = loader.load("../illustrations/BLD1.png")
      var b1Geo = new THREE.PlaneGeometry(40, 22.5);
      var b1Plane = new THREE.MeshStandardMaterial({
        map: BLD1T,
        transparent: true,
        depthWrite: false
        });
      BLD1 = new THREE.Mesh(b1Geo, b1Plane);
      BLD1.position.set(-90,0, 53); 
      BLD1.name="BLD1"; 
      //BLD2
      let BLD2T = loader.load("../illustrations/BD2.png")
      var b2Geo = new THREE.PlaneGeometry(38.4, 21.6);
      var b2Plane = new THREE.MeshStandardMaterial({
        map: BLD2T,
        transparent: true,
        depthWrite: false
        });
      BLD2 = new THREE.Mesh(b2Geo, b2Plane);
      BLD2.position.set(-90,0, 15); 
      BLD2.name="BLD2"; 
      //BLD3
      let BLD3T = loader.load("../illustrations/BLD3.PNG")
      var b3Geo = new THREE.PlaneGeometry(34.56, 25.119);
      var b3Plane = new THREE.MeshStandardMaterial({
        map: BLD3T,
        transparent: true,
        depthWrite: false
        });
      BLD3 = new THREE.Mesh(b3Geo, b3Plane);
      BLD3.position.set(-90,0, -10); 
      BLD3.name="BLD3"; 
       //nimitz
       let NimitzT = loader.load("../illustrations/Nimitz.PNG")
       var NimitzGeo = new THREE.PlaneGeometry(38.4, 21.6);
       var NimitzPlane = new THREE.MeshStandardMaterial({
         map: NimitzT,
         transparent: true,
         depthWrite: false
         });
         Nimitz = new THREE.Mesh(NimitzGeo, NimitzPlane);
         Nimitz.position.set(-11,0, 30); 
         Nimitz.name="nimitz"; 
          //torp
       let torpT = loader.load("../illustrations/Torpedo.png")
       var torpGeo = new THREE.PlaneGeometry(30.72, 17.28);
       var torpPlane = new THREE.MeshStandardMaterial({
         map: torpT,
         transparent: true,
         depthWrite: false
         });
         Torp = new THREE.Mesh(torpGeo, torpPlane);
         Torp.position.set(-10,0, -6); 
         Torp.rotation.z =  9 * (Math.PI / 180);
         Torp.name="torp"; 
              //YBL
       let yblT = loader.load("../illustrations/YBLH.png")
       var yblGeo = new THREE.PlaneGeometry(33.92, 43.2);
       var yblPlane = new THREE.MeshStandardMaterial({
         map: yblT,
         transparent: true,
         depthWrite: false
         });
         YBL = new THREE.Mesh(yblGeo, yblPlane);
         YBL.position.set(40,0, 13); 
         YBL.name="YBL"; 
         subPortalObj[0] = [BLD1,BLD2,BLD3,Nimitz,Torp,YBL]
         console.log( subPortalObj[1]); 
         subPortalObj[0].forEach(history=>{
          history.rotation.x = -90 * (Math.PI / 180);
          history.position.y = -30;
          history.material.opacity =0; 
           scene.add(history); 
         })
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
      if(camera.rotation.z >0){
       notAtzero =true; 
      }
     jump(eggs);  
     mainMapView(); 
    })
    .start();
  }
  function jump(objects){
    let jump= [-1, .8, .9,-1.4,1, -.8 ];   
    let timeF= [900, 800, 700, 900, 700, 800]; 
    objects.forEach((object, index)=> {
      let move = new THREE.Vector3(object.position.x,object.position.y ,object.position.z+ jump[index] )
     new TWEEN.Tween(object.position).to(move, timeF[index])
          .easing(TWEEN.Easing.Quadratic.InOut).repeat(Infinity).yoyo(true).start() 
     }); 
  }
  function mainMapView(){
    scene.remove(clouds); 
    scene.remove(landMass); 
  }; 

  function watchEvents(){
    console.log(eggs.length); 
    //MAIN PORTALS
    eggs.forEach((egg, index)=> {
        domEvents.addEventListener(egg, "click", function(event){
          goToClicked(zoomPositions[index], index);  
          //remove all the main eggs
          currentPortal = index; 
          eggs.forEach(egg=>{
          new TWEEN.Tween(egg.material ).to( { opacity: 0 }, 2000 ).onComplete(()=>{
            scene.remove(egg);}).onComplete(()=>{
              jump(subPortalObj[index]); 
              mainMapBtn.style="display:flex"; 
              subPortalObj[index].forEach(subPortal=>{
                //bring those subPortal Objects in
                //add clickEvents for subPortals
                domEvents.addEventListener(subPortal, "click", function(event){
                  clickSubPortal(subPortal, index);  
                }); 
                subPortal.position.y = 3;
                new TWEEN.Tween(subPortal.material).to( { opacity: 1 }, 1000 ).onComplete(()=>{
                //bring in the intro popUp 
                introPopups[index].style ="display: block;"
                }).start();
              })    
            }).start();
            })
      })
  })
}
function closePopUps(){
  allPopUps.forEach(popUp=>{
    popUp.style="display:none"
    // mainMapBtn.style="display:flex"; 
  })
}
function goToMainPortal(){
  closePopUps()
  zoomPositions[currentPortal]
  let coords = new THREE.Vector3(zoomPositions[currentPortal].x, zoomPositions[currentPortal].y, zoomPositions[currentPortal].z);
 new TWEEN.Tween(camera.position).to(coords, 2000).easing(TWEEN.Easing.Quadratic.InOut).start(); 
}
function goToMainMap(){
  closePopUps(); 
  mainMapBtn.style="display:none"; 
  //bring back the easter eggs 
  eggs.forEach(egg=>{
    new TWEEN.Tween(egg.material ).to( { opacity: 1 }, 2000 ).start(); 
})
subPortalObj.forEach(subPortal=>{
  subPortal.forEach(subSubPortal=>{
    new TWEEN.Tween(subSubPortal.material).to( { opacity: 0 }, 2000 ).start(); 
  })
})
let coords = new THREE.Vector3(camMain.x, camMain.y, camMain.z);
var tween = new TWEEN.Tween(camera.position)
.to(coords, 2000).delay(500) 
.easing(TWEEN.Easing.Quadratic.InOut).start(); 
}
  function goToClicked(position, index){
       // jump(subPortal);  
    new TWEEN.Tween(camera.position).to(
      position, 1500).easing(TWEEN.Easing.Quadratic.In)
    .onComplete(() =>{}).start(); 
  }

  function clickSubPortal(subPortal, index){
    let position ={x:subPortal.position.x, y:subPortal.position.y+30, z:subPortal.position.z}
    goToClicked(position, index)
    console.log(subPortal.name); 
    subPortalPopUps.forEach(popUp=>{
    if(popUp.id == subPortal.name){
      popUp.style="display:block"; 
    }; 
    })
  }



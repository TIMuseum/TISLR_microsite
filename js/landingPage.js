// window.addEventListener("load", function(){
//     // preventDefault();
//     var scrollOptions = {
//       left: 0,
//       top: 0,
//       behavior: 'auto'
//     }
//     window.scrollTo(scrollOptions); 
// }); 

var SLRswitchers = document.querySelectorAll(".SLRwitch"); 
var SLRInches = document.getElementById("topSLR"); 
var years = document.getElementById("year"); 
var noDev = document.querySelector(".nAdMap"); 
var Dev = document.querySelector(".adMap"); 
var medIMG = document.querySelectorAll(".medIMG"); 
var highIMG = document.querySelectorAll(".highIMG"); 
let currentYR = 0; 
let highSC = false; 
let lowSC = true; 
let addition; 
function nextSection(element){
    console.log("clicked!");
    console.log(element); 
    element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
}

function switchScenarios(scenario, changeFrom){
  console.log(scenario)
  if (scenario.classList.contains("selected")){
    console.log("you are already on this one");
    return; 
  }
  else{
    scenario.classList.add("selected"); 
    changeFrom.classList.remove("selected"); 
    console.log(SLRInches.children[1]); 

    if(scenario.id=="med"){
      console.log("medium scenario"); 
      highSC = false; 
      lowSC = true; 
      SLRInches.children[0].children[0].innerHTML="4 in"
      SLRInches.children[1].children[0].innerHTML="7 in"
      SLRInches.children[2].children[0].innerHTML="11 in"
      console.log(highIMG); 
      console.log(medIMG); 
      for(let i=2; i<8; i++){
        noDev.children[i].classList.add("remove")
        noDev.children[i].classList.remove("selectedIMG")
        Dev.children[i].classList.add("remove")
        Dev.children[i].classList.remove("selectedIMG")
      
      }

  Dev.children[currentYR+2].classList.remove("remove")
  Dev.children[currentYR+2].classList.add("selectedIMG")
  noDev.children[currentYR+2].classList.add("selectedIMG")
  noDev.children[currentYR+2].classList.remove("remove")
  
    }
    else{
      console.log("high scenario"); 
      highSC = true; 
      lowSC = false; 
      SLRInches.children[0].children[0].innerHTML="7 in"
      SLRInches.children[1].children[0].innerHTML="13 in"
      SLRInches.children[2].children[0].innerHTML="24 in"

      for(let i=2; i<8; i++){
        noDev.children[i].classList.add("remove")
        noDev.children[i].classList.remove("selectedIMG")
        Dev.children[i].classList.add("remove")
        Dev.children[i].classList.remove("selectedIMG")
      
      }

  Dev.children[currentYR+5].classList.remove("remove")
  Dev.children[currentYR+5].classList.add("selectedIMG")
  noDev.children[currentYR+5].classList.add("selectedIMG")
  noDev.children[currentYR+5].classList.remove("remove")
  
    }
//do something to change to the other scenario 
  }
}

function switchYR(year, index){
console.log(year); 
if (year.classList.contains("currentCirc")){
  console.log("you are already on this one");
  return; 
}
else{
  SLRswitchers.forEach(circle=>{
circle.classList.remove('currentCirc'); 
  })
  year.classList.add('currentCirc');
console.log( SLRInches.children); 
for (let i=0; i<=2; i++){
  SLRInches.children[i].children[0].style = "color: #4CCDEA"; 
  years.children[i].children[0].style = "color: #4CCDEA"; 
}
 SLRInches.children[index].children[0].style ="color: #F9ECDC"; 
 years.children[index].children[0].style ="color: #F9ECDC"; 
}
for(let i=2; i<8; i++){

  noDev.children[i].classList.add("remove")
  noDev.children[i].classList.remove("selectedIMG")
  Dev.children[i].classList.add("remove")
  Dev.children[i].classList.remove("selectedIMG")

}
currentYR = index; 
if(highSC == true){
  addition = 5; 
}
if(lowSC == true){
  addition = 2; 
}
noDev.children[currentYR+addition].classList.add("selectedIMG")
noDev.children[currentYR+addition].classList.remove("remove")
Dev.children[currentYR+addition].classList.add("selectedIMG")
Dev.children[currentYR+addition].classList.remove("remove")
console.log(noDev.children[currentYR+addition]); 
console.log(Dev.children[currentYR+addition]); 
console.log(currentYR); 
}
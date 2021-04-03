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
      SLRInches.children[0].children[0].innerHTML="0 in"
      SLRInches.children[1].children[0].innerHTML="3 in"
      SLRInches.children[2].children[0].innerHTML="7 in"
    }
    else{
      console.log("high scenario"); 
      SLRInches.children[0].children[0].innerHTML="0 in"
      SLRInches.children[1].children[0].innerHTML="6 in"
      SLRInches.children[2].children[0].innerHTML="16.8 in"
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
}
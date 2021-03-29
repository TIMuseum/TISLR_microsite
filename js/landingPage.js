window.addEventListener("load", init);
function init(){
    window.scrollTo(0, 0); 
}

function nextSection(element){
    console.log("clicked!");
    console.log(element); 
    element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
}
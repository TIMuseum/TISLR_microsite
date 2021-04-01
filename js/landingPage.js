// window.addEventListener("load", function(){
//     // preventDefault();
//     var scrollOptions = {
//       left: 0,
//       top: 0,
//       behavior: 'auto'
//     }
//     window.scrollTo(scrollOptions); 
// }); 

function nextSection(element){
    console.log("clicked!");
    console.log(element); 
    element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
}
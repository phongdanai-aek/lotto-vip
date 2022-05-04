const body = document.querySelector("body"),
  sidebar = body.querySelector("nav"),
  toggle = body.querySelector(".toggle-menu"),
  modeSwitch = body.querySelector(".toggle-switch"),
  modeText = body.querySelector(".mode-text")


// ######################################################### Dark- Light mode #########################################################
let getMode = localStorage.getItem("mode");
if (getMode && getMode === "dark-mode") {
  body.classList.add("dark");
}

modeSwitch.addEventListener("click", () => {
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    localStorage.setItem("mode", "dark-mode");
  } else {
    localStorage.setItem("mode", "light-mode");
  }
});


// ######################################################### password Toggle #########################################################
// ######################################################### password Toggle #########################################################
var state = false;
function passToggle(idpass, ideye) {
  let theme = localStorage.getItem("mode");
  if (state) {
    document.getElementById(idpass).setAttribute("type", "password");
    document.getElementById(ideye).style.color = "#7a797e";

    state = false;
  } else {
    document.getElementById(idpass).setAttribute("type", "text");
    if(theme ==="light-mode"){
      document.getElementById(ideye).style.color = "#081d45";
    }else{
      document.getElementById(ideye).style.color = "#4b49ac";
    }
    

    state = true;
  }  
};

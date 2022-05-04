const body = document.querySelector("body"),
  sidebar = body.querySelector("nav"),
  toggle = body.querySelector(".toggle-menu"),
  modeSwitch = body.querySelector(".toggle-switch"),
  modeText = body.querySelector(".mode-text");

// ######################################################### Dark- Light mode #########################################################
let getMode = localStorage.getItem("mode");
if (getMode && getMode === "dark-mode") {
  body.classList.add("dark");
}

modeSwitch.addEventListener("click", () => {
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    localStorage.setItem("mode", "dark-mode");
    modeText.innerText = "Light mode";
  } else {
    localStorage.setItem("mode", "light-mode");
    modeText.innerText = "Dark mode";
  }
});

toggle.addEventListener("click", () => {
  sidebar.classList.toggle("close");
  if (sidebar.classList.contains("close")) {
    toggle.classList.replace("bx-menu-alt-left", "bx-menu");
  } else {
    toggle.classList.replace("bx-menu", "bx-menu-alt-left");
  }
});

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
    if (theme === "light-mode") {
      document.getElementById(ideye).style.color = "#081d45";
    } else {
      document.getElementById(ideye).style.color = "#4b49ac";
    }

    state = true;
  }
}

// ######################################################### Lotto Limited Text #########################################################
function lottoLimitedCheck(limitedData, lotttoNumber) {
  if (
    limitedData.length === 0 ||
    lotttoNumber.length < 2 ||
    lotttoNumber.length > 3
  ) {
    return 100;
  }

  for (let keyTndex in limitedData) {
    if (lotttoNumber === limitedData[keyTndex].LOTTO_NUMBER) {
      if (limitedData[keyTndex].PAYMENT_P === "50") {
        return 50;
      } else if (limitedData[keyTndex].PAYMENT_P === "0") {
        return 0;
      } else {
        return parseInt(limitedData[keyTndex].PAYMENT_P);
      }
    }
  }
  return 100;
}

function moneyFormat(num) {
  var num_parts = num.toString().split(".");
  num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return num_parts.join(".");
}

// ####################################################### StringBuilder ########################################
function StringBuilder(value) {
  this.strings = new Array();
  this.append(value);
}

StringBuilder.prototype.append = function (value) {
  if (value) {
      this.strings.push(value);
  }
}

StringBuilder.prototype.clear = function () {
  this.strings.length = 0;
}

StringBuilder.prototype.toString = function () {
  return this.strings.join("");
}

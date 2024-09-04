"use strict";

document.addEventListener("DOMContentLoaded", function () {
// Darkness Toggle //
const darkMain = document.querySelector("#dark-main");
const darkToggleButton = document.getElementById("dark-toggle");
const sun = document.getElementById("sun");
const moon = document.getElementById("moon");

darkToggleButton.addEventListener("click", function () {
  darkMain.classList.toggle("dark");
  
  if (darkMain.classList.contains("dark")) {
    // Fade out sun and fade in moon
    sun.classList.remove("opacity-100", "visible");
    sun.classList.add("opacity-0", "invisible");
    
    moon.classList.remove("opacity-0", "invisible");
    moon.classList.add("opacity-100", "visible");
  } else {
    // Fade out moon and fade in sun
    moon.classList.remove("opacity-100", "visible");
    moon.classList.add("opacity-0", "invisible");
    
    sun.classList.remove("opacity-0", "invisible");
    sun.classList.add("opacity-100", "visible");
  }
});
});

/* eslint-env browser */

import ApiClient from "./net/ApiClient.js";
import Canvas from "./ui/Canvas.js";
import Toolbar from "./ui/Toolbar.js";

const DOWNLOAD_NOTIFICATION_TEXT = "Searching for cute cats ...";

var canvas,
  canvasEl,
  notificationEl,
  toolbar,
  textInput;

function init() {
  canvas = new Canvas(".generator canvas");
  toolbar = new Toolbar(".generator .menu", onButtonClicked);
  canvasEl = document.querySelector(".generator canvas");
  notificationEl = document.querySelector(".generator .notification");
  textInput = document.querySelector("input");
  textInput.addEventListener("change", onTextChanged);
  hideTextInput();
  reloadImage();
}


function hideTextInput() {
  textInput.classList.add("hidden");
  textInput.value = "";
}

function showTextInput() {
  textInput.classList.remove("hidden");
  textInput.focus();
}

function showNotification(text) {
  notificationEl.innerHTML = text;
  notificationEl.classList.remove("hidden");
  canvasEl.classList.add("hidden");
}

function hideNotification() {
  notificationEl.classList.add("hidden");
  canvasEl.classList.remove("hidden");
}

async function reloadImage() {
  let image;
  showNotification(DOWNLOAD_NOTIFICATION_TEXT);
  image = await ApiClient.getRandomImage();
  canvas.setImage(image);
  hideNotification();
}

function onTextChanged() {
  canvas.setText(textInput.value);
  hideTextInput();
}

function downloadImage() {
  var link = document.createElement("a");
  link.download = "cat-meme.png";
  link.href = canvas.getImageURL();
  link.click();
}

function onButtonClicked(action) {
  switch (action) {
    case "reload":
      reloadImage();
      break;
    case "write":
      showTextInput();
      break;
    case "font":
      canvas.changeFont();
      break;
    case "fontColor":
      canvas.changeFontColor();
      break;
    case "fontSize":
      canvas.changeFontSize();
      break;
    case "download":
      downloadImage();
    default:
      break;

  }
}

init();
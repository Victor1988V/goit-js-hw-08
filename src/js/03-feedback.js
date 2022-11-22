import throttle from "lodash.throttle";

const feetBack = document.querySelector(".feedback-form");
const textarea = document.querySelector("textarea");
const inputs = document.querySelector("input");

const formData = {};
const STORAGE_KEY = "feedback-form-state";

feetBack.addEventListener("submit", onFormSubmit);
feetBack.addEventListener("input", throttle(onInputMessage, 500));
populateTextarea();

function onFormSubmit(event) {
  event.preventDefault();
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onInputMessage(event) {
  formData[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  // console.log(formData);
  // console.log(event.target.value);
}

function populateTextarea(event) {
  let savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedMessage) {
    inputs.value = savedMessage.email;
    textarea.value = savedMessage.message;
    // console.dir(textarea.value);
    // console.dir(inputs.value);
    // console.log(savedMessage.email);
    // console.log(savedMessage.message);
  }
}

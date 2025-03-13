
const regex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;
const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

function showInputError(formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(config.inputErrorClass);
  errorElement.classList.add(config.errorClass);
  errorElement.textContent = errorMessage;
};

function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

function checkInputValidity(formElement, inputElement, config) {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
    return;
  }

  if(inputElement.type === 'text' && !regex.test(inputElement.value)) {
    showInputError(formElement, inputElement, inputElement.dataset.errorMessage, config);
    return;
  }

  if(inputElement.type === 'url' && !urlRegex.test(inputElement.value)) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
    return;
  }

  hideInputError(formElement, inputElement, config);
  return true;
};

function hasInvalidInput(inputList) {
  return inputList.some(inputElement =>{
    if(!inputElement.validity.valid) return true;

    if(inputElement.type === 'text' && !regex.test(inputElement.value)) return true;

    if(inputElement.type === 'url' && !urlRegex.test(inputElement.value)) return true;

    return false;
  });
};

function disableSubmitButton(buttonElement, config) {
  buttonElement.classList.add(config.inactiveButtonClass);
  buttonElement.disabled = true;
};

function enableSubmitButton(buttonElement, config) {
  buttonElement.classList.remove(config.inactiveButtonClass);
  buttonElement.disabled = false;
};

function toggleButtonState(inputList, buttonElement, config) {
  if(hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement, config);
  } else {
    enableSubmitButton(buttonElement, config);
  }
};

function setEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));

  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);


  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', ()=> {
      checkInputValidity(formElement, inputElement, config);

      toggleButtonState(inputList, buttonElement, config);
    })
  })
};

export function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach(formElement => setEventListeners(formElement, config));
};

export function clearValidation(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));

  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, config);
  });
  
  toggleButtonState(inputList, buttonElement, config)
};



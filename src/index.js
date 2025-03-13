
import './pages/index.css';
import { handleDelete, handleLike, createCard } from './components/card.js';
import { handleClickPopupClose } from './components/modal.js';
import { openPopup, closePopup } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js'
import { getUserInfo, getInitialCards, updateUserProfile, createCardOnServer, updateAvatar } from './components/api.js';

const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const placesList = document.querySelector('.places__list');

const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const cardHandlers = { onDelete: handleDelete, onLike: handleLike, viewImage: handleOpenImagePopup };

const formEditProfile = document.forms['edit-profile'];
const inputTypeName = formEditProfile.elements.name;
const inputTypeDescription = formEditProfile.elements.description;

const formNewPlace = document.forms['new-place'];
const inputPlaceName = formNewPlace.elements['place-name'];
const inputLink = formNewPlace.elements.link;

const formNewAvatar = document.forms['new-avatar'];
const inputAvatar = formNewAvatar.elements.avatar;

const popupTypeImage = document.querySelector('.popup_type_image');
const imageModal = popupTypeImage.querySelector('.popup__image');
const captionModal = popupTypeImage.querySelector('.popup__caption');

const popupTypeAvatar = document.querySelector('.popup_type_avatar');
const profileImage = document.querySelector('.profile__image');

function renderLoading(form, isLoading, defaultText = 'Сохранить') {
  const button = form.querySelector('.popup__button');
  if(isLoading) {
    button.textContent = 'Сохранение...';
    button.disabled = true;
  } else {
    button.textContent = defaultText;
    button.disabled = false;
  }
}

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  renderLoading(formNewAvatar, true);

  const avatarLink = inputAvatar.value;

  updateAvatar(avatarLink)
    .then(data => {
      profileImage.src = data.avatar; // Обновляем аватар в профиле
      closePopup(popupTypeAvatar);
      formNewAvatar.reset();
    })
    .catch(err => console.error(err))
    .finally(()=> renderLoading(formNewAvatar, false))
}

formNewAvatar.addEventListener('submit', handleAvatarSubmit);

function addCard(evt) {
  evt.preventDefault();
  renderLoading(formNewPlace, true);

  const name = inputPlaceName.value;
  const link = inputLink.value;
  
  createCardOnServer(name, link) // Отправляем данные на сервер
  .then(newCardData => {
    const card = createCard(newCardData, cardHandlers, userId); // Создаем карточку из данных сервера
    placesList.prepend(card);
    closePopup(popupTypeNewCard);
    formNewPlace.reset();
    clearValidation(formNewPlace, formValidationConfig);
  })
  .catch(err => {
    console.error('Ошибка добавления карточки:', err);
  })
  .finally(()=> renderLoading(formNewPlace, false))
}

formNewPlace.addEventListener('submit', addCard);

let userId;

Promise.all([getUserInfo(), getInitialCards()])
.then(([userData, cards]) => {
    userId = userData._id;
  
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.src = userData.avatar;

    cards.forEach(cardData => {
      const card = createCard(cardData, cardHandlers, userData._id); 
      placesList.append(card);
    });
  })
  .catch(err => console.error('Ошибка инициализации:', err))

function handleFormEditProfile(evt) {
  evt.preventDefault();

  renderLoading(popupTypeEdit, true);

  const newName = inputTypeName.value;
  const newDescription = inputTypeDescription.value;

  updateUserProfile(newName, newDescription)
    .then(data => {  
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
      closePopup(popupTypeEdit);
    })
    .catch(err => {
      console.error('Ошибка:', err.message, 'Код:', err.status);
    })
    .finally(()=> renderLoading(popupTypeEdit, false))
}

formEditProfile.addEventListener('submit', handleFormEditProfile);

function fillProfileForm(form) {
  form.elements.name.value = profileTitle.textContent;
  form.elements.description.value = profileDescription.textContent;

  clearValidation(formEditProfile, formValidationConfig);
}

function addEventListenersToButtons() {
  const editButton = document.querySelector('.profile__edit-button');
  editButton.addEventListener('click', ()=> {
    openPopup(popupTypeEdit);
    fillProfileForm(formEditProfile);
  });
  
  const addButton = document.querySelector('.profile__add-button');
  addButton.addEventListener('click', ()=> {
    clearValidation(formNewPlace, formValidationConfig);
    openPopup(popupTypeNewCard);
    inputPlaceName.value = '';
    inputLink.value = '';
  });

  const avatarImage = document.querySelector('.profile__image');
  avatarImage.addEventListener('click', () => {
    clearValidation(formNewAvatar, formValidationConfig);
    openPopup(popupTypeAvatar); 
    inputAvatar.value = '';
  });
}

function handleOpenImagePopup(name, link) {
  imageModal.src = link;
  imageModal.alt = name;
  captionModal.textContent = name;

  openPopup(popupTypeImage);
}

function setupPopupCloseHandlers() {
  const popupList = document.querySelectorAll('.popup');

  popupList.forEach((popup) => {
    popup.addEventListener('mousedown', (evt)=> handleClickPopupClose(evt, popup));
  });
}

addEventListenersToButtons();
setupPopupCloseHandlers();
enableValidation(formValidationConfig);

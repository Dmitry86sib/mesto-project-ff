
import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { handleDelete, handleLike, createCard } from './components/card.js';
import { handleClickPopupClose } from './components/modal.js';
import { openPopup, closePopup } from './components/modal.js';

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

const popupTypeImage = document.querySelector('.popup_type_image');
const imageModal = popupTypeImage.querySelector('.popup__image');
const captionModal = popupTypeImage.querySelector('.popup__caption');

function addCard(evt) {
  evt.preventDefault();

  const cardName = inputPlaceName.value;
  const cardLink = inputLink.value;

  const elem = { name: cardName, link: cardLink };
  const newCard = createCard(elem, cardHandlers);

  placesList.prepend(newCard);

  closePopup(popupTypeNewCard);
  formNewPlace.reset();
}

formNewPlace.addEventListener('submit', addCard);

function handleFormEditProfile(evt) {
  evt.preventDefault(); 

  profileTitle.textContent = inputTypeName.value;
  profileDescription.textContent = inputTypeDescription.value;

  closePopup(popupTypeEdit);
}

formEditProfile.addEventListener('submit', handleFormEditProfile);

function fillProfileForm(form) {
  form.elements.name.value = profileTitle.textContent;
  form.elements.description.value = profileDescription.textContent;
}

function addEventListenersToButtons() {
  const editButton = document.querySelector('.profile__edit-button');
  editButton.addEventListener('click', ()=> {
    openPopup(popupTypeEdit);
    fillProfileForm(formEditProfile);
  });
  
  const addButton = document.querySelector('.profile__add-button');
  addButton.addEventListener('click', ()=> openPopup(popupTypeNewCard));
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

initialCards.forEach(elem => {
  const card = createCard(elem, cardHandlers);
  placesList.append(card);
}); 

addEventListenersToButtons();
setupPopupCloseHandlers();


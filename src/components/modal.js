
export function handleClickPopupOpen(name, link) {
  const popupTypeImage = document.querySelector('.popup_type_image');
  
  const modal = document.querySelector('.popup__content_content_image');
  const imageModal = modal.querySelector('.popup__image');
  const captionModal = modal.querySelector('.popup__caption');

  imageModal.src = link;
  imageModal.alt = name;
  captionModal.textContent = name;

  openPopup(popupTypeImage);
  
  document.addEventListener('keydown', handleClosePopupEscape);
}

export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  popup.classList.add('popup_is-animated');
}

export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');

  document.removeEventListener('keydown', handleClosePopupEscape);
}

export function handleClickPopupClose() {
  const popupList = document.querySelectorAll('.popup');

  popupList.forEach(popup => {
    popup.addEventListener('mousedown', (evt)=> {
      if(evt.target.classList.contains('popup_is-opened') || evt.target.classList.contains('popup__close')) {
        closePopup(popup);
      }
    })
  })
}

function handleClosePopupEscape(evt) {
  const popup = document.querySelector('.popup_is-opened');

  if(evt.key === "Escape" && popup) {
    closePopup(popup);
  }
}

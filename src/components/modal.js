
export function handleClickPopupOpen(name, link) {
  const popupTypeImage = document.querySelector('.popup_type_image');
  
  const modal = document.querySelector('.popup__content_content_image');
  const imageModal = modal.querySelector('.popup__image');
  const captionModal = modal.querySelector('.popup__caption');

  imageModal.src = link;
  imageModal.alt = name;
  captionModal.textContent = name;

  openPopup(popupTypeImage);
}

export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  popup.classList.add('popup_is-animated');
}

export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
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

export function closePopupEscape() {
  document.addEventListener('keydown', (evt)=> {
    const popup = document.querySelector('.popup_is-opened')

    if(evt.key === "Escape" && popup) {
      closePopup(popup);
    }
  })
}

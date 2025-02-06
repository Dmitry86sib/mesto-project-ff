
export function openPopup(popup) {
  popup.classList.add('popup_is-opened');

  document.addEventListener('keydown', handleClosePopupEscape);
}

export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');

  document.removeEventListener('keydown', handleClosePopupEscape);
}

function handleClosePopupEscape(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector('.popup_is-opened');
    if (popup) {
      closePopup(popup);
    }
  }
}

export function handleClickPopupClose(evt, popup) {
  if (evt.target.classList.contains('popup_is-opened') || evt.target.classList.contains('popup__close')) {
    closePopup(popup);
  }
}

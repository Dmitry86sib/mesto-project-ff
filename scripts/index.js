
const templateCard = document.querySelector('#card-template').content.querySelector('.card');
const placesList = document.querySelector('.places__list');

function handleDelete(card) {
  card.remove();
}

function createCard(dataCard, { onDelete }) {
  const newCard = templateCard.cloneNode(true);

  const title = newCard.querySelector('.card__title');
  title.textContent = dataCard.name;

  const linkCard = newCard.querySelector('.card__image');
  linkCard.src = dataCard.link;
  linkCard.alt = dataCard.name;

  const deleteButton = newCard.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', ()=> {
    onDelete(newCard);
  })

  return newCard;
}

initialCards.forEach(elem => placesList.append(createCard(elem, { onDelete: handleDelete })));
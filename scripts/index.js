// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const templateCard = document.querySelector('#card-template').content.querySelector('.card');
const placesList = document.querySelector('.places__list');

function handleDelete(card) {
  card.remove();
}

function createCard(dataCard, { onDelete }) {
  const newCard = templateCard.cloneNode(true);

  newCard.querySelector('.card__title').textContent = dataCard.name;
  newCard.querySelector('.card__image').src = dataCard.link;
  newCard.querySelector('.card__image').alt = dataCard.name;

  newCard.querySelector('.card__delete-button').addEventListener('click', ()=> {
    onDelete(newCard);
  })

  return newCard;
}

initialCards.forEach(elem => placesList.append(createCard(elem, { onDelete: handleDelete })));
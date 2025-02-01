
import './pages/index.css';
import { initialCards } from './scripts/cards.js';

const templateCard = document.querySelector('#card-template').content.querySelector('.card');
const placesList = document.querySelector('.places__list');

function handleDelete(card) {
  card.remove();
}

function handleLike(icon) {
  icon.classList.toggle('card__like-button_is-active');
}

function createCard(dataCard, { onDelete, onLike }) {
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

  newCard.addEventListener('click', (evt)=> {
    if(evt.target.classList.contains('card__like-button')) {
      onLike(evt.target);
    }
  }) 

  return newCard;
}

initialCards.forEach(elem => {
  const card = createCard(elem,  { onDelete: handleDelete, onLike: handleLike });
  placesList.append(card);
});


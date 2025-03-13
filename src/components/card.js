

import { addLike, removeLike, deleteCard } from './api.js';

const templateCard = document.querySelector('#card-template').content.querySelector('.card');

export function handleDelete(cardId, cardElement) {
  deleteCard(cardId) // ← Вызывает API-метод
    .then(() => cardElement.remove())
    .catch(err => console.log(err))
}

export const handleLike = (cardId, isLiked) => {
  const apiCall = isLiked ? addLike(cardId) : removeLike(cardId);
  
  return apiCall
    .then(updatedCard => {
      return updatedCard; 
    })
    .catch(err => console.log(err))
}

export function createCard(dataCard, { onDelete, onLike, viewImage }, userId) {
  const newCard = templateCard.cloneNode(true);
  const title = newCard.querySelector('.card__title');
  const link = newCard.querySelector('.card__image');
  const deleteButton = newCard.querySelector('.card__delete-button');
  const likeCount = newCard.querySelector('.card__like-count');

  title.textContent = dataCard.name;
  link.src = dataCard.link;
  link.alt = dataCard.name;
  likeCount.textContent = dataCard.likes?.length || 0;

  link.addEventListener('click', ()=>{
    viewImage(dataCard.name, dataCard.link);
  })

  if (dataCard.owner._id !== userId) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener('click', () => {
      onDelete(dataCard._id, newCard); 
    });
  }

  const likeButton = newCard.querySelector('.card__like-button');
  
  const hasUserLiked = dataCard.likes.some(like => like._id === userId);
  if (hasUserLiked) {
    likeButton.classList.add('card__like-button_is-active');
  } else {
    likeButton.classList.remove('card__like-button_is-active');
  }
  likeCount.textContent = dataCard.likes.length;


  newCard.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('card__like-button')) {
      const currentIsLiked = likeButton.classList.contains('card__like-button_is-active');

      likeButton.classList.toggle('card__like-button_is-active');
      
      const newIsLiked = !currentIsLiked;
  
      onLike(dataCard._id, newIsLiked)
        .then(updatedCard => {
          likeCount.textContent = updatedCard.likes.length;
        })
        .catch(err => console.log(err))
    }
  });

  return newCard;
}
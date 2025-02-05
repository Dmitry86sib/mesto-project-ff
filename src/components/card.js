
export function handleDelete(card) {
  card.remove();
}

export function handleLike(icon) {
  icon.classList.toggle('card__like-button_is-active');
}

export function createCard(dataCard, { onDelete, onLike, viewImage }) {
  const templateCard = document.querySelector('#card-template').content.querySelector('.card');
  const newCard = templateCard.cloneNode(true);

  const title = newCard.querySelector('.card__title');
  title.textContent = dataCard.name;

  const linkCard = newCard.querySelector('.card__image');
  linkCard.src = dataCard.link;
  linkCard.alt = dataCard.name;
  
  linkCard.addEventListener('click', ()=> viewImage(dataCard.name, dataCard.link));

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